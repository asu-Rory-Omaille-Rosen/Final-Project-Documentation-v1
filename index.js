
    const input = document.getElementById("interest-input");
    const list = document.getElementById("interest-list");

    const saved = JSON.parse(localStorage.getItem("interests")) || [];
    saved.forEach(addToList);

    function addInterest() {
    
      const value = input.value.trim();
      if (!value) return;

  const exists = saved.some(item => item.toLowerCase() === value.toLowerCase());
  if (exists) {
    showDuplicateWarning();
    return;
  }

      addToList(value);

      saved.push(value);
      localStorage.setItem("interests", JSON.stringify(saved));

      input.value = "";
      
    }

  
    
function deleteInterest(li, text) {
  
  li.classList.add("animate-fadeOut");

  
  setTimeout(() => {
    li.remove();

    
    const index = saved.indexOf(text);
    if (index > -1) {
      saved.splice(index, 1);
      localStorage.setItem("interests", JSON.stringify(saved));
    }
  }, 250);
}


function addToList(text) {
  const li = document.createElement("li");
  li.className =
    "flex items-center justify-between bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg shadow-sm text-gray-700 animate-slideIn";

  const span = document.createElement("span");
  span.textContent = text;

  const btn = document.createElement("button");
  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" 
         fill="none" viewBox="0 0 24 24" 
         stroke-width="2" stroke="currentColor" 
         class="w-5 h-5 text-red-500 hover:text-red-700 transition">
      <path stroke-linecap="round" stroke-linejoin="round" 
            d="M6 18L18 6M6 6l12 12" />
    </svg>
  `;
  btn.onclick = () => deleteInterest(li, text);

  li.appendChild(span);
  li.appendChild(btn);
  list.appendChild(li);
}

//still need to add functionality

function saveProfile() {
  const profile = {
    name: document.getElementById("profile-name").value,
    bio: document.getElementById("profile-bio").value,
    twitter: document.getElementById("profile-twitter").value,
    instagram: document.getElementById("profile-instagram").value,
    picture: document.getElementById("profile-pic").src,
    interests: saved
  };

  localStorage.setItem("profile", JSON.stringify(profile));
}


// makes Ice Breaker List 
function addIceBreaker() {
  const input = document.getElementById("icebreaker-input");
  const list = document.getElementById("icebreaker-list");
  const value = input.value.trim();

  if (value === "") return;

  
  const items = Array.from(list.children).map(li => li.textContent.trim());
  if (items.includes(value)) {
    alert("That ice-breaker is already on your list.");
    return;
  }

  
  const li = document.createElement("li");
  li.textContent = value;
  li.className = "px-4 py-2 bg-gray-100 rounded-lg border";

  list.appendChild(li);

  
  input.value = "";


  
}


//retrieves interest

function getInterests() {
  const list = document.getElementById("interest-list");
  return Array.from(list.children).map(li => li.textContent.trim());
}


// Makes Conversational suggestion card with interests
function renderConversationAdLib() {
  const container = document.getElementById("adlib-container");
  container.innerHTML = ""; 

  const interests = getInterests();
  if (interests.length === 0) return;

  
  const interest = interests[Math.floor(Math.random() * interests.length)];

  
  const card = document.createElement("div");
  card.className =
    "bg-white shadow-md rounded-xl p-6 border border-gray-200 w-full max-w-md space-y-4";

  const bubbleA = document.createElement("div");
  bubbleA.className =
    "bg-gray-200 text-gray-900 px-4 py-3 rounded-lg w-fit max-w-full";
  bubbleA.textContent = "Hey! How are you doing?";

  
  const bubbleB = document.createElement("div");
  bubbleB.className =
    "bg-black text-white px-4 py-3 rounded-lg w-fit max-w-full";
  bubbleB.textContent = `Great! Been getting into ${interest} lately!`;

  
  card.appendChild(bubbleA);
  card.appendChild(bubbleB);

  
  container.appendChild(card);
}





