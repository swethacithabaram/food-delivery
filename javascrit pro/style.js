 var swiper = new Swiper(".mySwiper", {
    loop:true,
      navigation: {
        nextEl: "#next",
        prevEl: "#prev",
      },
    });




const links = document.querySelectorAll('.navlist a');
const sections = document.querySelectorAll('section');


window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150; 
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});






let cart = [];

const addButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartIcon = document.querySelector('.cart-icon');
const cartValue = document.querySelector('.cart-value');
const cartBox = document.getElementById('cart-box');
const closeBtn = document.querySelector('.close-btn');
const totalElement = document.querySelector('.card-total');


addButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    const card = e.target.closest('.order-card');
    const name = card.querySelector('.product-name').innerText;
    const priceText = card.querySelector('.price').innerText;

   
    const price = parseFloat(priceText.replace('$', ''));


     const imgSrc = card.querySelector('img').getAttribute('src');

    const product = { name, price, imgSrc};
    cart.push(product);

    cartValue.innerText = cart.length; // cart count update
    displayCart();
  });
});


cartIcon.addEventListener('click', (e) => {
  e.preventDefault();
  cartBox.classList.toggle('hidden');
  displayCart();
});


closeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  cartBox.classList.add('hidden');
});


function displayCart() {
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<li>No items in cart</li>';
    totalElement.innerText = '$0.000';
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="item flex">
        <div class="item-img">
          <img src="${item.imgSrc}" alt="${item.name}" style="width:60px; height:60px; border-radius:10px;">
        </div>
        <div class="detail">
          <h4>${item.name}</h4>
          <p class="item-total">$${item.price.toFixed(2)}</p>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(li);

    total += item.price; // total add
  });

  totalElement.innerText = `$${total.toFixed(3)}`; // 3 decimal format
}






























