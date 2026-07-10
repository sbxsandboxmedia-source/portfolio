const preloader=document.querySelector(".preloader");
window.addEventListener("load",()=>setTimeout(()=>preloader.classList.add("hide"),2400));

const text="Mechanical Engineer.";
const typing=document.getElementById("typing");
let i=0;
setTimeout(function type(){if(i<text.length){typing.textContent+=text.charAt(i);i++;setTimeout(type,95)}},2600);

const navbar=document.querySelector(".navbar");
const cursor=document.querySelector(".cursor");
const glow=document.querySelector(".glow");
window.addEventListener("mousemove",e=>{
  cursor.style.left=e.clientX+"px";cursor.style.top=e.clientY+"px";
  glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px";
});
window.addEventListener("scroll",()=>{navbar.classList.toggle("scrolled",scrollY>50);reveal()});

function reveal(){
  document.querySelectorAll(".reveal").forEach(el=>{
    if(el.getBoundingClientRect().top<innerHeight-120){
      el.classList.add("active");
      el.querySelectorAll(".skill b").forEach(bar=>bar.style.width=bar.dataset.width);
      el.querySelectorAll("[data-count]").forEach(counter=>{
        if(counter.dataset.done)return; counter.dataset.done=1;
        let target=+counter.dataset.count, n=0, step=Math.max(1,Math.ceil(target/60));
        let timer=setInterval(()=>{n+=step;if(n>=target){n=target;clearInterval(timer)}counter.textContent=n+"+"},25);
      });
    }
  });
}
reveal();

document.querySelectorAll(".tilt").forEach(card=>{
  card.addEventListener("mousemove",e=>{
    const r=card.getBoundingClientRect(), x=e.clientX-r.left, y=e.clientY-r.top;
    const rx=((y/r.height)-.5)*-8, ry=((x/r.width)-.5)*8;
    card.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener("mouseleave",()=>card.style.transform="perspective(900px) rotateX(0) rotateY(0)");
});

document.querySelectorAll(".work img").forEach((img,idx)=>{
  img.onerror=()=>{img.style.display="none"; img.parentElement.style.background=`linear-gradient(135deg,hsl(${idx*45},45%,88%),#fff)`};
});

// Certificate preview modal
const certificateModal = document.getElementById("certificateModal");
const certificatePreview = document.getElementById("certificatePreview");
const certificateClose = document.querySelector(".certificate-close");

document.querySelectorAll(".certificate-card").forEach(card => {
  const image = card.querySelector("img");
  image.onerror = () => {
    image.style.display = "none";
  };

  card.addEventListener("click", () => {
    const source = card.dataset.certificate;
    certificatePreview.src = source;
    certificateModal.classList.add("open");
    certificateModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeCertificateModal(){
  certificateModal.classList.remove("open");
  certificateModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  setTimeout(() => certificatePreview.src = "", 350);
}

certificateClose.addEventListener("click", closeCertificateModal);
certificateModal.addEventListener("click", e => {
  if(e.target === certificateModal) closeCertificateModal();
});
document.addEventListener("keydown", e => {
  if(e.key === "Escape" && certificateModal.classList.contains("open")){
    closeCertificateModal();
  }
});
