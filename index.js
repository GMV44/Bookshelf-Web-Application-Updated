// class for individual book
class Book {
    constructor(author, language, subject, title,){
        this.author = author;
        this.language = language;
        this.subject = subject;
        this.title = title;
        //random color generator 
        this.color = Math.floor(Math.random() * 5);
    }

    render(){
        let bookWrapper = document.createElement("div");
        bookWrapper.id = "bookWrapper";
        //some if statments to give each book their own colors based on their randomly generated number
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

        // title author and language for each book
        let bookDescriptor = document.createElement("h1");
        bookDescriptor.id = "bookDescriptor"
        bookDescriptor.textContent = `${this.title} written by ${this.author}, available in ${this.language}.`
        bookWrapper.append(bookDescriptor);

        // createing an ol and appending it to the book
        let bookSubjects = document.createElement("ol");
        bookSubjects.id = "bookSubjects"
        bookWrapper.append(bookSubjects);

        // for loop for each subject to append to book
        for(let subj of this.subject){
            let subjectList = document.createElement("div");
            subjectList.innerHTML = subj;
            bookSubjects.append(subjectList)
        }

        // creating a comment button and giving it an eventlistener so when it is pressed it reveals the comment input and add comment button
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

        //creating the commentAdd button so you can add your comment to said book. after you add your comment the input field and button disappear for a cleaner look.
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

//creating the bookshelf class
class Bookshelf {
    constructor(){
        this.arrayOfBooks = [];
    }

addBooks(abook){
    this.arrayOfBooks.push(abook);
}
// added a addToFront function so when you add a book it gets added to the front and not the very end of the list. I think its a little more satisfying because you see the result immediately. 
addBookFront(abook){
    this.arrayOfBooks.unshift(abook);
}

render(){
    let shelfOfBook = document.querySelector("body");

    let listOfBookWrapper = document.createElement("ul");
    listOfBookWrapper.id = "listOfBookWrapper"

    //looping through all the books in my array and appending them to listOfBookWrapper
    for(const books of this.arrayOfBooks){
        listOfBookWrapper.append(books.render())
    }
    shelfOfBook.append(listOfBookWrapper);

    //creating my sortByTitle function. just repeated the same thing for sorting by author below. Wanted to make one for language and subject as well but felt it was kinda overkill, I felt like having just 2 gave it a cleaner look.
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
        //deletes the previous board and then repopulates a newly rendered board
        this.emptyBoard();
        this.render();
    })

    //very simple counter utilizing string literal, then styles on CSS
    let counter = document.querySelector("#counter");
    counter.innerHTML = `Number of Books : ${this.arrayOfBooks.length}`;
}

// very simple emptyBoard function that removes the previous list of Books
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

// my Add book function. takes the values from all the inputs and creates a new book then utilizes the addBookFront function to add it to the front of the list.
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
