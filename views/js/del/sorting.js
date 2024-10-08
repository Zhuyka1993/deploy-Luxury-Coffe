// BUTTONS
function clear() {
    const allElements = document.querySelectorAll(".boxContent");
    allElements.forEach((element) => {
      element.style.display = "none";
    });
  }
  
  document.querySelector(".all").onclick = () => {
    document.querySelectorAll(".boxContent").forEach((element) => {
      element.style.display = "flex";
    });
  };
  
  document.querySelector(".coffee").onclick = () => {
    clear();
    document.querySelectorAll(".coffee").forEach((element) => {
      element.style.display = "flex";
    });
  };
  
  document.querySelector(".tea").onclick = () => {
    clear();
    document.querySelectorAll(".tea").forEach((element) => {
      element.style.display = "flex";
    });
  };
  
  document.querySelector(".coctail").onclick = () => {
    clear();
    document.querySelectorAll(".coctail").forEach((element) => {
      element.style.display = "flex";
    });
  };
  
  document.querySelector(".cakes").onclick = () => {
    clear();
    document.querySelectorAll(".cakes").forEach((element) => {
      element.style.display = "flex";
    });
  };