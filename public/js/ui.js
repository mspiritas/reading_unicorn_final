const books = document.querySelector(".books");

document.addEventListener("DOMContentLoaded", function () {
    const menus = document.querySelectorAll(".side-menu");
    M.Sidenav.init(menus, { edge: "right" });
    const forms = document.querySelectorAll(".side-form");
    M.Sidenav.init(forms, { edge: "left" });
});

const renderBook = (data, id) => {
    const html =
    <div data id="${id}">
        <div class="book-detail">
            <div class="book-description">${data.description}</div>
        </div>
        <div class="book-delete">
            <i class="material-icons" data-id="${id}">delete_outline</i>
        </div>
    </div>;
books.innerHTML += html;
};

const removeBook = (id) => {
    const book=document.querySelector(`.book[data-id=${id}]`);
    book.remove();
};