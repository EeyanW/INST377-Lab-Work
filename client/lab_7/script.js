// As the last step of your lab, hook this up to index.html

function htmlInjector(selected) {
  const firstList = document.querySelector('#resto-list');
  firstList.innerHTML = '';
  selected.forEach((item) => {
    const {name} = item;
    const externalName = name.toLowerCase();
    firstList.innerHTML += (`<li>${externalName}</li>`);
  });
}

function randomizerFunction(array) {
  console.table(array); // this is called "dot notation"
  const shuffled = array.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 15);
  htmlInjector(selected);
}

async function mainEvent() { // the async keyword means we can make API requests
  console.log('test');
  submitPressedBool = false;
  const restaurantName = document.querySelector('#restaurant-name');
  const categoryName = document.querySelector('#category');
  const form = document.querySelector('.food-form'); // change this selector to match the id or classname of your actual form
  const submit = document.querySelector('.form-row button');
  // submit.style.display = 'none';
  const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an objec
  currentArray = arrayFromJson.slice();
  if (arrayFromJson.length > 0) {
    restaurantName.addEventListener('input', async (event) => {
      if (arrayFromJson.length < 1) {
        return;
      }
      const restaurantSelector = arrayFromJson.filter((item) => {
        const restaurantNameInput = item.name.toLowerCase();
        return restaurantNameInput.includes(event.target.value.toLowerCase());
      });
      currentArray = restaurantSelector;
      console.log(restaurantSelector);
      if (submitPressedBool) {
        randomizerFunction(currentArray);
      }
    });

    categoryName.addEventListener('input', async (event) => {
      if (arrayFromJson.length < 1) {
        return;
      }
      const categorySelector = currentArray.filter((item) => {
        const categoryNameInput = item.category.toLowerCase();
        return categoryNameInput.includes(event.target.value.toLowerCase());
      });
      // currentArray = categorySelector;
      console.log(categorySelector);
      if (submitPressedBool) {
        randomizerFunction(categorySelector);
      }
    });

    form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      console.log('form submission'); // this is substituting for a "breakpoint"
      // arrayFromJson.data - we're accessing a key called 'data' on the returned object
      // it contains all 1,000 records we need
      submit.style.display = 'block';
      randomizerFunction(currentArray);
      submitPressedBool = true;
    });
  }
}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
