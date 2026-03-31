let nivel = 1;
let preguntaIndex = 0;
let aciertos = 0;

// CORAZONES
setInterval(() => {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerText = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  document.querySelector(".hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}, 500);

// TYPEWRITER
function escribirTexto(texto, id) {
  let i = 0;
  const el = document.getElementById(id);
  function escribir() {
    if (i < texto.length) {
      el.innerHTML += texto.charAt(i);
      i++;
      setTimeout(escribir, 40);
    }
  }
  escribir();
}

window.onload = () => {
  escribirTexto(
    "Prepárate para este pequeño juego y tienes que acertar todas",
    "introTexto",
  );
};

// SCORE
function actualizarScore() {
  document.getElementById("score").innerText = aciertos;
}

// PREGUNTAS (tus 6 niveles intactos)
const preguntas = {
  /* TU MISMO OBJETO TAL CUAL */
  1: [
    {
      p: "¿Dónde nos conocimos?",
      opciones: [
        "Por Redes Sociales 📱",
        "En la Comunidad Juvenil ⛪",
        "En una fiesta 🎉",
      ],
      correcta: 1,
    },
    {
      p: "¿Cuántos somos en el grupito que formamos en la CJ?",
      opciones: ["8", "6", "4"],
      correcta: 2,
    },
  ],
  2: [
    {
      p: "¿Cuál fue la razón por la que tuvimos la primera cita?",
      opciones: [
        "La culpa la tiene un helado 🍦",
        "Nos obligaron a ambos",
        "Tu querias comerme a la fuerza 🫦",
      ],
      correcta: 0,
    },
    {
      p: "¿Dónde fue nuestra primera cita?",
      opciones: ["Discoteca 🪩", "Playa 🏖️", "Metro y luego concierto 🎤"],
      correcta: 2,
    },
  ],
  3: [
    {
      p: "¿Cuándo fue el dia que te sentiste más querida por Alex?",
      opciones: [
        "Cuando Alex te besó media luna 😘",
        "El primer dia del Boulevard 🏨",
        "Cuando te muerdo los labios 💋",
      ],
      correcta: 1,
    },
    {
      p: "¿Cuál fue el día que se sintió más querido tu fósil?",
      opciones: [
        "Cuando le diste su Hotwheels 🏎️",
        "Cuando le regalaste al maestro Roshy y a Sleepy 🐷",
        "Cuando recibió su regalo por su cumpleaños # 25 💌",
      ],
      correcta: 2,
    },
  ],
  4: [
    {
      p: "¿Cual es la comida favorita de Alex?",
      opciones: [
        "Ensalada Rusa con pollo al horno 🍗",
        "Tallarines verdes con bisteck 🍝",
        "Chaufa de pollo 🍚",
      ],
      correcta: 0,
    },
    {
      p: "Un día que Alex se sintió muy nervioso",
      opciones: [
        "Primera vez que salimos 👫",
        "Una Llamada por la noche 🌘",
        "Cuando fue a llevarte las flores amarillas y tu papá salió 🏵️",
      ],
      correcta: 2,
    },
  ],
  5: [
    {
      p: "¿Cuánto te quiere tu fósil?",
      opciones: [
        "Normal lo justo y necesario",
        "Te quiere tanto que ni las palabras alcanzan para describirlo",
        "Te quiere como a una muy buena amiga",
      ],
      correcta: 1,
    },
    {
      p: "¿Cuándo hicimos match en outfit?",
      opciones: [
        "Los dias que fuimos al Boulevard 🛏️",
        "Cuando salimos con Jimena a comer 😋",
        "Cuando te quedaste a dormir en mi casa 🏠",
      ],
      correcta: 0,
    },
  ],
  6: [
    {
      p: "¿Cuántos meses salimos el año pasado?",
      opciones: [
        "Al rededor de 2 meses",
        "Al rededor de 4 meses",
        "Aproximadamente 8 meses",
      ],
      correcta: 2,
    },
    {
      p: "¿Cuándo empezó nuestra relación?",
      opciones: [
        "1 enero del 2026 🎇",
        "31 diciembre del 2025",
        "5 de octubre del 2006",
      ],
      correcta: 0,
    },
  ],
};

// RESTO DEL JUEGO IGUAL
function show(id) {
  document
    .querySelectorAll(".card")
    .forEach((c) => c.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function startGame() {
  aciertos = 0;
  actualizarScore();
  show("juego");
  cargarPregunta();
}

function cargarPregunta() {
  let data = preguntas[nivel][preguntaIndex];
  document.getElementById("nivel").innerText = "Nivel " + nivel;
  document.getElementById("pregunta").innerText = data.p;

  let contenedor = document.getElementById("opciones");
  contenedor.innerHTML = "";

  data.opciones.forEach((op, i) => {
    let div = document.createElement("div");
    div.classList.add("opcion");
    div.innerText = op;
    div.onclick = () => seleccionar(div, i);
    contenedor.appendChild(div);
  });
}

function mostrarModal(texto, tipo, callback) {
  const modal = document.getElementById("modal");
  const contenido = document.getElementById("modalContenido");

  contenido.className =
    "modal-box " + (tipo === "ok" ? "modal-success" : "modal-error");
  document.getElementById("modalTexto").innerText = texto;

  modal.classList.add("show");

  setTimeout(() => {
    modal.classList.remove("show");
    if (callback) callback();
  }, 3000);
}

function seleccionar(el, i) {
  let data = preguntas[nivel][preguntaIndex];
  let ops = document.querySelectorAll(".opcion");
  ops.forEach((o) => (o.onclick = null));

  if (i === data.correcta) {
    el.classList.add("correcta");
    aciertos++;
    actualizarScore();
    mostrarModal("¡Muy bien baby +1 punto!", "ok", siguientePaso);
  } else {
    el.classList.add("incorrecta");
    ops[data.correcta].classList.add("correcta");
    mostrarModal("💔 Fallaste baby", "error", siguientePaso);
  }
}

function siguientePaso() {

limpiarColores(); // 👈 AQUI


  preguntaIndex++;

  if (preguntaIndex >= 2) {
    if (aciertos === 2) {
      if (nivel < 6) premio();
      else mostrarPremioFinal();
    } else {
      alert("💞 Intentemos otra vez amor 💞");
      preguntaIndex = 0;
      aciertos = 0;
      actualizarScore();
      cargarPregunta();
    }
  } else cargarPregunta();
}

function premio() {
  show("premio");

  const premios = {
    1: {
      msg: "Muy bien pasaste el Nivel 1 ❤️ ",
      img: "img/foto4fantasticos.webp",
    },
    2: {
      msg: "Muy bien pasaste el Nivel 2 ❤️ ",
      img: "img/primeraSalida.webp",
    },
    3: {
      msg: "Muy bien pasaste el Nivel 3 ❤️ ",
      img: "img/fotoMiCumpleaños.webp",
    },
    4: {
      msg: "Muy bien pasaste el Nivel 4 ❤️ ",
      img: "img/floresAmarillas.webp",
    },
    5: { msg: "Muy bien pasaste el Nivel 5 ❤️ ", img: "img/matchOutfit.webp" },
    6: { msg: "Muy bien pasaste el Nivel 6 ❤️ ", img: "img/añoNuevo.webp" },
  };

  document.getElementById("mensajePremio").innerText = premios[nivel].msg;
  document.getElementById("imagenPremio").src = premios[nivel].img;
}

function siguienteNivel() {
  nivel++;
  preguntaIndex = 0;
  aciertos = 0;
  actualizarScore();
  show("juego");
  cargarPregunta();
}

function mostrarPremioFinal() {
  show("premioFinal");
  const imgs = document.querySelectorAll(".finalImg");
  let i = 0;

  function next() {
    imgs.forEach((img) => img.classList.remove("active"));
    imgs[i].classList.add("active");
    i++;
    if (i < imgs.length) setTimeout(next, 3000);
    else setTimeout(() => show("final"), 3000);
  }

  next();
}

// FACHADA
function entrarSorpresa() {
  const boton = document.querySelector(".btn-hotel");

  boton.innerText = "Enviando evaluación . . .";

  setTimeout(() => {
    show("inicio");
  }, 1500);
}

function abrirSorpresa() {
  // ocultar formulario del hotel
  document.getElementById("hotelIntro").classList.remove("active");

  // mostrar sorpresa (inicio del juego)
  document.getElementById("inicio").classList.add("active");
}

//ESTRELLAS RATING
document.querySelectorAll(".stars").forEach((stars) => {
  const starList = stars.querySelectorAll("span");

  starList.forEach((star, index) => {
    star.addEventListener("click", () => {
      starList.forEach((s, i) => {
        if (i <= index) {
          s.classList.add("active");
        } else {
          s.classList.remove("active");
        }
      });
    });
  });
});

//FUNCION SORPRESA ABRIR

function abrirSorpresa() {
  const modal = document.getElementById("modalEnvio");
  const contador = document.getElementById("contadorEnvio");

  modal.classList.add("show");

  let tiempo = 10;

  contador.innerText = tiempo;

  const intervalo = setInterval(() => {
    tiempo--;
    contador.innerText = tiempo;

    if (tiempo === 0) {
      clearInterval(intervalo);

      modal.classList.remove("show");

      // ocultar formulario hotel
      document.getElementById("hotelIntro").classList.remove("active");

      // mostrar sorpresa
      document.getElementById("inicio").classList.add("active");
    }
  }, 1000);
}




function limpiarColores() {
  document.querySelectorAll(".opcion").forEach(btn => {
    btn.classList.remove("correcta");
    btn.classList.remove("incorrecta");
  });
}