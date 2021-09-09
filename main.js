const ul = document.querySelector('.itemList');
let li = document.createElement("li");

function loadData() {
    return fetch('data/data.json')
    .then(response => response.json())
    .then(json=>json.items);
}

function viewItems(items) {
    const container = document.querySelector('.itemList');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item) {
    return ` 
        <li class="item">
            <img src="${item.img}" alt="${item.color}${item.type}">
            <span class="itemExplain">${item.gender}, ${item.size} size</span>
        </li>
    `;
}
function onClickButton(items) {
    document.querySelector('.logo img').addEventListener('click',() => {
        viewItems(items);  
    })

    document.querySelector('.buttonGroup').addEventListener('click', t => {
        const dataset = t.target.dataset;
        const $value = dataset.value;
        let filterItems =items.filter(function(e) {
            return e.type === $value || e.color === $value;
        });
        viewItems(filterItems);
    });
}

loadData()
.then(items => {
    console.log(items);
    viewItems(items);
    onClickButton(items);
})