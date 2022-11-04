
class Book {
    constructor(author, language, subject, title, color){
        this.author = author;
        this.language = language;
        this.subject = subject;
        this.title = title;
        this.color = Math.floor(Math.random() * 5);
        this.comment = [];
    }

    render(){
        let bookWrapper = document.createElement("div");
        bookWrapper.id = "bookWrapper";

        if(this.color == 0){
            bookWrapper.style.backgroundColor = "#7A4983"
        }
        if(this.color == 1){
            bookWrapper.style.backgroundColor = "#82A7A6"
        }
        if(this.color == 2){
            bookWrapper.style.backgroundColor = "#985F6F"
        }
        if(this.color == 3){
            bookWrapper.style.backgroundColor = "#98B06F"
        }
        if(this.color == 4){
            bookWrapper.style.backgroundColor = "#EE9958"
        }

        let bookDescriptor = document.createElement("h1");
        bookDescriptor.id = "bookDescriptor"
        bookDescriptor.textContent = `${this.title} written by ${this.author}, available in ${this.language}.`
        bookWrapper.append(bookDescriptor);

        let bookSubjects = document.createElement("ol");
        bookSubjects.id = "bookSubjects"
        bookWrapper.append(bookSubjects);

        for(let subj of this.subject){
            let subjectList = document.createElement("div");
            subjectList.innerHTML = subj;
            bookSubjects.append(subjectList)
        }

        let commentButton = document.createElement("button");
        commentButton.id = "commentButton"
        commentButton.textContent = "Comment";
        commentButton.addEventListener("click", ()=>{
            commentInput.style.display = "block";
            commentAdd.style.display = "block";
        })
        bookWrapper.append(commentButton)


        let commentInput = document.createElement("input");
        commentInput.id = "commentInput";
        bookWrapper.append(commentInput);

        let commentAdd = document.createElement("button");
        commentAdd.id = "commentAdd";
        commentAdd.textContent = "Add";
        commentAdd.addEventListener("click", ()=>{
            let commentText = document.createElement("div");
            commentText.id = "commentText"
            commentText.textContent = `User Comment: ${commentInput.value}`;
            bookWrapper.append(commentText);
            commentInput.style.display = "none";
            commentAdd.style.display = "none"
        })
        bookWrapper.append(commentAdd);
                

        return bookWrapper;
    }
}

class Bookshelf {
    constructor(){
        this.arrayOfBooks = [];
    }

addBooks(abook){
    this.arrayOfBooks.push(abook);
}

addBookFront(abook){
    this.arrayOfBooks.unshift(abook);
}

render(){
    let shelfOfBook = document.querySelector("body");

    let listOfBookWrapper = document.createElement("ul");
    listOfBookWrapper.id = "listOfBookWrapper"

    for(const books of this.arrayOfBooks){
        listOfBookWrapper.append(books.render())
    }
    shelfOfBook.append(listOfBookWrapper);

    let sortByTitle = document.querySelector("#sortByTitle");
    sortByTitle.addEventListener("click", () => {
        this.arrayOfBooks.sort((a,b) => {
            if(a.title[0] < b.title[0]){
                return -1;
            }
            if(a.title[0] > b.title[0]){
                return 1;
            }
            else return 0;
        })
        this.emptyBoard();
        this.render();
    })

    let sortByAuthor = document.querySelector("#sortByAuthor");
    sortByAuthor.addEventListener("click", () => {
        this.arrayOfBooks.sort((a,b) => {
            if(a.author[0] < b.author[0]){
                return -1;
            }
            if(a.author[0] > b.author[0]){
                return 1;
            }
            else return 0;
        })
        this.emptyBoard();
        this.render();
    })

    let counter = document.querySelector("#counter");
    counter.innerHTML = `Number of Books : ${this.arrayOfBooks.length}`;
}

emptyBoard(){
    let previousRender = document.querySelector("#listOfBookWrapper");
    previousRender.remove();
}
}

let bookDirectory = new Bookshelf();

for(const book of bookData){
    let bookInstance = new Book(book.author, book.language, book.subject, book.title);
    bookDirectory.addBooks(bookInstance);
}

bookDirectory.render();

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  let addBookButton = document.querySelector("#addBookButton");
  let addAuthorInput = document.querySelector("#addAuthorInput");
  let addLanguageInput = document.querySelector("#addLanguageInput");
  let addSubjectsInput = document.querySelector("#addSubjectsInput");
  let addTitleInput = document.querySelector("#addTitleInput");

  addBookButton.addEventListener("click",(event) =>{
    bookDirectory.emptyBoard();
    let subjectsArray = [];
    author_ = addAuthorInput.value;
    language_ = addLanguageInput.value;
    subjectsArray.push(addSubjectsInput.value);
    title_ = addTitleInput.value;
    let newBook = new Book(author_,language_,subjectsArray,title_);
    bookDirectory.addBookFront(newBook);
    bookDirectory.render() 
  })
