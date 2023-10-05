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
        let atzera = document.querySelector("#atzera");
        let bilatu = document.querySelector("#bilatu");

        // bilatu botoia sakatzean, erabiltzaileak sartu duen isbn-a duen liburua lortu
        // eta handleSearchData funtzioa exekutatu
        bilatu.onclick = () => {
            let iden = this.isbn.innerText;
            let liburu_berria = fetch(this.search_base+iden).then(resp => resp.json())
            this.handleSearchData(liburu_berria);
        }
        
    }

    extractBookData = (book) => {
        // json objektu egoki bat bueltatu, zure webgunean erabili ahal izateko
        return null;
      };
      
    addBookToData = (book, data) => {
        // data array-ean sartu liburua, eta liburu berriaren posizioa bueltatu
        this.data.push(book)
        this.liburuKopuru = this.liburuKopuru + 1;
        return this.data.length;
    };

    handleSearchData = (data) => {
        // lortu liburua data objektutik
        // extractBookData eta addBookToData funtzioak erabili, indizea berria lortuz
        this.index = addBookToData(data, data);
        // updateView funtzioa erabili, liburu berria bistaratzeko
    };


    
    aldatu = () =>{
        // Irudia aldatu
        this.irudia.src = base + library[((index % library.length)+library.length) % library.length].filename;

        // Izenburua idatzi
        this.izenburu.value = library[((index % library.length)+library.length) % library.length].izenburua;

        // Egilea idatzi
        this.egile.value = library[((index % library.length)+library.length) % library.length].egilea;

        //ISBN idatzi
        this.isbn.value = library[((index % library.length)+library.length) % library.length].isbn;

        // Data idatzi
        this.data.value = library[((index % library.length)+library.length) % library.length].data;
    }

    updateView() {
        // liburuaren datu guztiak bistaratu
        this.aldatu();
        // liburu kopurua bistaratu
        this.liburuKopuru = this.data.length
    }

    nextBook() {
        // Hurrengo indizea lortu eta updateView funtzioa erabili bistaratzeko
        // ez ezazu liburu kopurua gainditu
        index = index + 1
        this.updateView();
    }

    prevBook() {
        // Aurreko indizea lortu eta updateView funtzioa erabili bistaratzeko
        // ez ezazu 0 indizea gainditu
        index = index - 1
        this.updateView();
    }
}
