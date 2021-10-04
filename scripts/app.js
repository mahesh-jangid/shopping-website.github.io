(function () {
  const cardOverlay = document.querySelector(".cart-overlay");
  const cart = document.querySelector(".cart-item");
  const cartBtn = document.querySelector(".cart-btn");
  const closeCartBtn = document.querySelector(".close-btn");

  //    show the cart

  cartBtn.addEventListener("click", function () {
    cardOverlay.classList.add("transparentBg");
    cart.classList.add("show-cart");
  });

  //   close the cart

  closeCartBtn.addEventListener("click", function () {
    cardOverlay.classList.remove("transparentBg");

    cart.classList.remove("show-cart");
  });

  const addItemBtn = document.querySelectorAll(".bag-btn");

  addItemBtn.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      cardOverlay.classList.add("transparentBg");
      cart.classList.add("show-cart");

      if (e.target.classList.contains("bag-btn")) {
        let item = [];

        item.img = e.target.parentElement.children[0].src;
        console.log(item.img);

        const name =
          e.target.parentElement.nextSibling.nextSibling.children[0]
            .textContent;
        item.name = name;

        console.log(item);

        const price =
          e.target.parentElement.nextElementSibling.nextElementSibling
            .children[1].textContent;
        console.log(price);
        item.price = price;

        // create cart div

        let cartContainer = document.querySelector(".cart-container");
        let cartDiv = document.createElement("div");
        cartDiv.classList.add("cart");
        let otherData = `    <div class="cart-img-container">
        <img
          src="${item.img}"
          alt="product img"
          class="img-fluid"
        />
      </div>
      <div class="item-content">
        <h3 class="item-title">${item.name}</h3>
        <h5>$ <span class="item-price">${item.price}</span></h5>
      </div>
      <div class="remove-item">
        <span class="ti-trash"></span>
      </div>`;

        cartDiv.innerHTML = otherData;
        console.log(cartDiv);
        cartContainer.insertAdjacentElement("afterbegin", cartDiv);

        showTotal();

        // clear all cart
        const removeTotalItem = document.querySelector(".clear-cart");
        removeTotalItem.addEventListener("click", function () {
          cartDiv.remove();
          showTotal();
        });
      }
    });
  });

  // showtotal function

  function showTotal() {
    let total = [];

    let PriceItem = document.querySelectorAll(".item-price");
    PriceItem.forEach(function (price) {
      total.push(parseFloat(price.textContent));
    });

    const totalMoney = total.reduce(function (total, price) {
      total += price;
      return total;
    }, 0);

    const finalMoney = totalMoney.toFixed(2);

    // reference from DOM
    const TotalPriceDOM = document.querySelector(".total-price");
    const TotalItems = document.querySelector(".total-items");
    const removeItem = document.querySelectorAll(".remove-item");

    TotalPriceDOM.innerHTML = finalMoney;

    TotalItems.innerHTML = total.length;

    // remove selected cart item

    removeItem.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.target.parentElement.parentElement.remove();
        showTotal();
      });
    });
  }
})();
