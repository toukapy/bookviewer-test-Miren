export class BookViewer {

    constructor(data, base) {
        this.base = base;
        this.search_base = 'https://openlibrary.org/search.json?isbn=';
        this.data = data;
        this.index = 0;

        this.irudia = document.getElementById("irudia");
        this.egilea = document.getElementById("egilea");
        this.izenburua = document.getElementById("izenburua");
        this.dataElem = document.getElementById("data");
        this.isbn = document.getElementById("isbn");
        this.liburuKopuru = document.getElementById("liburuKopuru");

        this.initButtons();
        this.updateView();
    }

    initButtons() {
        // aurrera, atzera eta bilatu botoiak hasieratu
        let botoia = document.querySelector("#aurrera");
        botoia.onclick = () => {
            this.nextBook();
        }
        let atzera = document.querySelector("#atzera");
        atzera.onclick = () => {
            this.prevBook();
        }

        let bilatu = document.querySelector("#bilatu");

        // bilatu botoia sakatzean, erabiltzaileak sartu duen isbn-a duen liburua lortu
        // eta handleSearchData funtzioa exekutatu
        bilatu.onclick = () => {
            let iden = this.isbn.value;
            fetch(this.search_base+iden).then(resp => resp.json()).then(resp => this.handleSearchData(resp));
        }
        
    }

    extractBookData = (book) => {
        // json objektu egoki bat bueltatu, zure webgunean erabili ahal izateko
        let info = {
            "isbn":book['isbn'][0],
            "egilea":book['author_name'],
            "data":book['publish_date'][0],
            "izenburua":book['title'],
            "filename":book['cover_i'] + ".jpg"
        }
        return info;
      };
      
    addBookToData = (book, data) => {
        // data array-ean sartu liburua, eta liburu berriaren posizioa bueltatu
        this.data.push(book)
        return this.data.length-1;
    };

    handleSearchData = (data) => {
        // lortu liburua data objektutik
        let liburua = data.docs[0];
        // extractBookData eta addBookToData funtzioak erabili, indizea berria lortuz
        let info = this.extractBookData(liburua);
        this.index = this.addBookToData(info, data);
        // updateView funtzioa erabili, liburu berria bistaratzeko
        this.updateView();
    };




    updateView() {
        // liburuaren datu guztiak bistaratu
        // Irudia aldatu
        this.irudia.src = this.base + this.data[((this.index % this.data.length)+this.data.length) % this.data.length].filename;

        // Izenburua idatzi
        this.izenburua.value = this.data[((this.index % this.data.length)+this.data.length) % this.data.length].izenburua;

        // Egilea idatzi
        this.egilea.value = this.data[((this.index % this.data.length)+this.data.length) % this.data.length].egilea;

        //ISBN idatzi
        this.isbn.value = this.data[((this.index % this.data.length)+this.data.length) % this.data.length].isbn;

        // Data idatzi
        this.dataElem.value = this.data[((this.index % this.data.length)+this.data.length) % this.data.length].data;
        // liburu kopurua bistaratu
        this.liburuKopuru.innerText = this.data.length;
    }

    nextBook() {
        // Hurrengo indizea lortu eta updateView funtzioa erabili bistaratzeko
        // ez ezazu liburu kopurua gainditu
        this.index = this.index + 1
        this.updateView();
    }

    prevBook() {
        // Aurreko indizea lortu eta updateView funtzioa erabili bistaratzeko
        // ez ezazu 0 indizea gainditu
        this.index = this.index - 1
        this.updateView();
    }
}
