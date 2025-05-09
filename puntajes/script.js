let configData = {};
let currentQuestion = 1;
let equipoPuntajes = {};
let respuestasSeleccionadas = {};
let tiposPregunta = [];
let currentStep = 1;
const totalSteps = 3; // Ahora solo hay 3 pasos

// Puntajes predefinidos
const PUNTOS_PREDEFINIDOS = {
  facil: {
    correcto: 15,
    incorrecto: -8,
  },
  medio: {
    correcto: 20,
    incorrecto: -5,
  },
  dificil: {
    correcto: 35,
    incorrecto: -2,
  },
};

const isConfigPage = document.getElementById("configForm") !== null;
const isGamePage = document.getElementById("equiposGrid") !== null;

if (isConfigPage) {
  const form = document.getElementById("configForm");
  const equiposRange = document.getElementById("equiposRange");
  const equiposValue = document.getElementById("equiposValue");
  const equiposContainer = document.getElementById("equiposContainer");
  const totalPreguntasSelect = document.getElementById("totalPreguntasSelect");
  const preguntasFacil = document.getElementById("preguntasFacil");
  const preguntasMedio = document.getElementById("preguntasMedio");
  const preguntasDificil = document.getElementById("preguntasDificil");
  const totalPreguntasEl = document.getElementById("totalPreguntas");

  for (let i = 1; i <= totalSteps; i++) {
    const paso = document.getElementById(`paso${i}`);
    if (i === 1) {
      paso.classList.add("active");
    } else {
      paso.classList.remove("active");
    }
  }
  for (let i = 1; i < totalSteps; i++) {
    const nextBtn = document.getElementById(`paso${i}Next`);
    nextBtn.addEventListener("click", () => {
      // Si es el paso 1, actualizar los campos de equipos antes de validar
      if (i === 1) {
        const numEquipos = parseInt(
          document.getElementById("equiposRange").value
        );
        actualizarEquiposInputs(numEquipos);
      }

      if (validarPasoActual(i)) {
        mostrarPaso(i + 1);
      }
    });
  }

  for (let i = 2; i <= totalSteps; i++) {
    const prevBtn = document.getElementById(`paso${i}Prev`);
    prevBtn.addEventListener("click", () => {
      mostrarPaso(i - 1);
    });
  }

  function mostrarPaso(numero) {
    // Asegurarse de que el número está dentro del rango válido
    if (numero < 1 || numero > totalSteps) {
      console.error(`Paso inválido: ${numero}`);
      return;
    }

    const pasoActual = document.getElementById(`paso${currentStep}`);
    const pasoNuevo = document.getElementById(`paso${numero}`);

    if (!pasoActual || !pasoNuevo) {
      console.error(
        `Error: No se encontró el paso ${!pasoActual ? currentStep : numero}`
      );
      return;
    }

    const avanzando = numero > currentStep;
    pasoActual.classList.remove("active");

    if (avanzando) {
      pasoActual.classList.add("prev");
      setTimeout(() => {
        pasoNuevo.classList.add("active");
      }, 50);
    } else {
      pasoActual.style.transform = "translateX(100%)";
      pasoActual.style.opacity = "0";
      setTimeout(() => {
        pasoActual.style.transform = "";
        pasoNuevo.classList.add("active");
      }, 50);
    }

    currentStep = numero;
    actualizarIndicadoresPaso();
  }

  function actualizarIndicadoresPaso() {
    if (!document.querySelector(".step-indicator")) {
      const indicatorContainer = document.createElement("div");
      indicatorContainer.className = "step-indicator";

      for (let i = 1; i <= totalSteps; i++) {
        const step = document.createElement("div");
        step.className = "step";
        if (i === currentStep) {
          step.classList.add("active");
        } else if (i < currentStep) {
          step.classList.add("complete");
        }
        indicatorContainer.appendChild(step);
      }
      const form = document.getElementById("configForm");
      form.parentNode.insertBefore(indicatorContainer, form);
    } else {
      const steps = document.querySelectorAll(".step");
      steps.forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove("active", "complete");

        if (stepNum === currentStep) {
          step.classList.add("active");
        } else if (stepNum < currentStep) {
          step.classList.add("complete");
        }
      });
    }
  }

  if (isConfigPage) {
    document.addEventListener("DOMContentLoaded", () => {
      actualizarIndicadoresPaso();
    });
  }

  function validarPasoActual(paso) {
    switch (paso) {
      case 1:
        // Validar número de equipos
        const numEquipos = parseInt(
          document.getElementById("equiposRange").value
        );
        return true;

      case 2:
        // Validar nombres de equipos
        const numEquiposActual = parseInt(
          document.getElementById("equiposRange").value
        );
        for (let i = 1; i <= numEquiposActual; i++) {
          const nombreEquipo = document
            .getElementById(`equipo${i}`)
            .value.trim();
          if (!nombreEquipo) {
            alert(`Por favor, ingresa un nombre para el Equipo ${i}.`);
            return false;
          }
        }
        return true;

      case 3:
        // Validar distribución de preguntas
        const faciles =
          parseInt(document.getElementById("preguntasFacil").value) || 0;
        const medias =
          parseInt(document.getElementById("preguntasMedio").value) || 0;
        const dificiles =
          parseInt(document.getElementById("preguntasDificil").value) || 0;
        const totalPreguntasActual = parseInt(
          document.getElementById("totalPreguntasSelect").value
        );

        if (faciles + medias + dificiles !== totalPreguntasActual) {
          alert(`El total de preguntas debe ser ${totalPreguntasActual}.`);
          return false;
        }

        return true;
    }
  }

  if (equiposRange) {
    // Inicializar al cargar
    actualizarEquiposInputs(parseInt(equiposRange.value));

    equiposRange.addEventListener("input", () => {
      const numEquipos = parseInt(equiposRange.value);
      equiposValue.textContent = numEquipos;
      actualizarEquiposInputs(numEquipos);
    });
  }

  if (totalPreguntasSelect) {
    totalPreguntasSelect.addEventListener("change", function () {
      totalPreguntasRonda = parseInt(this.value);
      totalPreguntasEl.textContent = `Total: ${validarTotalPreguntas()} de ${totalPreguntasRonda} preguntas`;
      // Actualizar el color basado en si es válido o no
      validarTotalPreguntas();
    });
  }
  function actualizarEquiposInputs(numEquipos) {
    equiposContainer.innerHTML = "";

    for (let i = 1; i <= numEquipos; i++) {
      const div = document.createElement("div");
      div.className = "equipo-input";

      const label = document.createElement("label");
      label.htmlFor = `equipo${i}`;
      label.textContent = `Nombre Equipo ${i}:`;

      const input = document.createElement("input");
      input.type = "text";
      input.id = `equipo${i}`;
      input.name = `equipo${i}`;
      input.required = true;
      input.placeholder = `Equipo ${i}`;

      div.appendChild(label);
      div.appendChild(input);
      equiposContainer.appendChild(div);
    }

    // Actualizar los campos en el paso 2
    const paso2 = document.getElementById("paso2");
    if (paso2) {
      paso2.querySelector(
        "h2"
      ).textContent = `Nombres de ${numEquipos} Equipos`;
    }
  }

  [preguntasFacil, preguntasMedio, preguntasDificil].forEach((input) => {
    input.addEventListener("input", validarTotalPreguntas);
  });

  function validarTotalPreguntas() {
    const faciles = parseInt(preguntasFacil.value) || 0;
    const medias = parseInt(preguntasMedio.value) || 0;
    const dificiles = parseInt(preguntasDificil.value) || 0;

    const total = faciles + medias + dificiles;
    totalPreguntasEl.textContent = `Total: ${total} de ${totalPreguntasRonda} preguntas`;

    if (total !== totalPreguntasRonda) {
      totalPreguntasEl.style.color = "red";
    } else {
      totalPreguntasEl.style.color = "green";
    }

    return total;
  }

  // Evento submit actualizado con los puntajes predefinidos
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validar el último paso
    if (!validarPasoActual(3)) {
      return;
    }

    const numEquipos = parseInt(document.getElementById("equiposRange").value);
    const equipos = [];
    const totalPreguntasActual = parseInt(
      document.getElementById("totalPreguntasSelect").value
    );

    for (let i = 1; i <= numEquipos; i++) {
      const nombre = document.getElementById(`equipo${i}`).value;
      equipos.push({ id: i, nombre: nombre, puntaje: 0 });
    }

    const faciles = parseInt(document.getElementById("preguntasFacil").value);
    const medias = parseInt(document.getElementById("preguntasMedio").value);
    const dificiles = parseInt(
      document.getElementById("preguntasDificil").value
    );

    // Añadir el total de preguntas a la configuración
    configData = {
      equipos: equipos,
      puntos: {
        facil: PUNTOS_PREDEFINIDOS.facil.correcto,
        medio: PUNTOS_PREDEFINIDOS.medio.correcto,
        dificil: PUNTOS_PREDEFINIDOS.dificil.correcto,
      },
      puntosIncorrectos: {
        facil: PUNTOS_PREDEFINIDOS.facil.incorrecto,
        medio: PUNTOS_PREDEFINIDOS.medio.incorrecto,
        dificil: PUNTOS_PREDEFINIDOS.dificil.incorrecto,
      },
      preguntas: {
        facil: faciles,
        medio: medias,
        dificil: dificiles,
        total: totalPreguntasActual,
      },
      penalidad: 0, // No aplica penalidad por no responder
    };

    tiposPregunta = [
      ...Array(configData.preguntas.facil).fill("facil"),
      ...Array(configData.preguntas.medio).fill("medio"),
      ...Array(configData.preguntas.dificil).fill("dificil"),
    ];

    localStorage.setItem("competenciaConfig", JSON.stringify(configData));
    localStorage.setItem("tiposPregunta", JSON.stringify(tiposPregunta));

    window.location.href = "game.html";
  });
}

if (isGamePage) {
  const configString = localStorage.getItem("competenciaConfig");
  const tiposString = localStorage.getItem("tiposPregunta");

  if (!configString || !tiposString) {
    alert("No hay configuración. Redirigiendo a la página inicial.");
    window.location.href = "index.html";
  } else {
    configData = JSON.parse(configString);
    tiposPregunta = JSON.parse(tiposString);

    configData.equipos.forEach((equipo) => {
      equipoPuntajes[equipo.id] = 0;
    });

    iniciarJuego();
  }

  function iniciarJuego() {
    document.getElementById("numeroPregunta").textContent = currentQuestion;
    // Actualizar al total de preguntas configurado
    document.getElementById("totalPreguntas").textContent =
      configData.preguntas.total;
    actualizarTipoPregunta();

    const equiposGrid = document.getElementById("equiposGrid");
    equiposGrid.innerHTML = "";

    configData.equipos.forEach((equipo) => {
      const equipoCard = document.createElement("div");
      equipoCard.className = "equipo-card";
      equipoCard.id = `equipo-${equipo.id}`;

      const nombreEl = document.createElement("div");
      nombreEl.className = "equipo-nombre";
      nombreEl.textContent = equipo.nombre;

      const puntajeEl = document.createElement("div");
      puntajeEl.className = "equipo-puntaje";
      puntajeEl.id = `puntaje-${equipo.id}`;
      puntajeEl.textContent = "0";

      const botonesEl = document.createElement("div");
      botonesEl.className = "equipo-botones";

      // Crear los botones en el orden correcto
      const btnCorrecto = document.createElement("button");
      btnCorrecto.textContent = "Correcto";
      btnCorrecto.dataset.accion = "correcto";
      btnCorrecto.dataset.equipo = equipo.id;

      const btnIncorrecto = document.createElement("button");
      btnIncorrecto.textContent = "Incorrecto";
      btnIncorrecto.dataset.accion = "incorrecto";
      btnIncorrecto.dataset.equipo = equipo.id;

      // Añadir los botones en el orden deseado
      botonesEl.appendChild(btnCorrecto);
      botonesEl.appendChild(btnIncorrecto);

      equipoCard.appendChild(nombreEl);
      equipoCard.appendChild(puntajeEl);
      equipoCard.appendChild(botonesEl);

      equiposGrid.appendChild(equipoCard);

      btnCorrecto.addEventListener("click", (e) =>
        seleccionarRespuesta(e.target)
      );
      btnIncorrecto.addEventListener("click", (e) =>
        seleccionarRespuesta(e.target)
      );
    });

    document
      .getElementById("confirmarBtn")
      .addEventListener("click", confirmarSeleccion);
  }

  function actualizarTipoPregunta() {
    const tipoActual = getTipoPreguntaActual();
    const tipoPreguntaEl = document.querySelector("#tipoPregunta span");
    const puntosActualesEl = document.querySelector("#puntosActuales span");

    let nombreTipo = "";
    let puntos = 0;

    switch (tipoActual) {
      case "facil":
        nombreTipo = "Fácil";
        puntos = configData.puntos.facil;
        break;
      case "medio":
        nombreTipo = "Media";
        puntos = configData.puntos.medio;
        break;
      case "dificil":
        nombreTipo = "Difícil";
        puntos = configData.puntos.dificil;
        break;
    }

    tipoPreguntaEl.textContent = nombreTipo;
    puntosActualesEl.textContent = `${puntos} punto(s)`;
  }

  function getTipoPreguntaActual() {
    return tiposPregunta[currentQuestion - 1];
  }

  function seleccionarRespuesta(boton) {
    const equipoId = boton.dataset.equipo;
    const accion = boton.dataset.accion;

    if (boton.classList.contains("selected")) {
      boton.classList.remove("selected");
      delete respuestasSeleccionadas[equipoId];
      return;
    }
    const otrosBotones = document.querySelectorAll(
      `.equipo-botones button[data-equipo="${equipoId}"]`
    );
    otrosBotones.forEach((btn) => {
      if (btn.classList.contains("selected")) {
        btn.classList.add("deselecting");
        setTimeout(() => {
          btn.classList.remove("selected", "deselecting");
        }, 150);
      } else {
        btn.classList.remove("selected");
      }
    });

    boton.classList.add("selecting");
    setTimeout(() => {
      boton.classList.add("selected");
      boton.classList.remove("selecting");
      respuestasSeleccionadas[equipoId] = accion;
      const equipoCard = document.getElementById(`equipo-${equipoId}`);
      if (equipoCard) {
        equipoCard.classList.add("selection-made");
        setTimeout(() => equipoCard.classList.remove("selection-made"), 300);
      }
    }, 50);
  }

  function confirmarSeleccion() {
    const todosSeleccionados = configData.equipos.every(
      (equipo) => respuestasSeleccionadas[equipo.id] !== undefined
    );

    if (!todosSeleccionados) {
      alert(
        "Debes seleccionar una opción para cada equipo antes de confirmar."
      );
      return;
    }

    const tipoActual = getTipoPreguntaActual();
    let puntosPregunta = 0;
    let puntosIncorrectos = 0;

    switch (tipoActual) {
      case "facil":
        puntosPregunta = configData.puntos.facil;
        puntosIncorrectos = configData.puntosIncorrectos.facil;
        break;
      case "medio":
        puntosPregunta = configData.puntos.medio;
        puntosIncorrectos = configData.puntosIncorrectos.medio;
        break;
      case "dificil":
        puntosPregunta = configData.puntos.dificil;
        puntosIncorrectos = configData.puntosIncorrectos.dificil;
        break;
    }

    configData.equipos.forEach((equipo) => {
      const accion = respuestasSeleccionadas[equipo.id];
      const puntajeAnterior = equipoPuntajes[equipo.id];
      const puntajeEl = document.getElementById(`puntaje-${equipo.id}`);

      let nuevoValor = puntajeAnterior;

      switch (accion) {
        case "correcto":
          nuevoValor = puntajeAnterior + puntosPregunta;
          break;
        case "incorrecto":
          // Calcular potencial nuevo valor
          const potencialNuevoValor = puntajeAnterior + puntosIncorrectos; // puntosIncorrectos ya es negativo

          // Asegurar que el puntaje no sea negativo
          nuevoValor = Math.max(0, potencialNuevoValor);
          break;
        case "noresponde":
          nuevoValor = puntajeAnterior; // No cambia el puntaje
          break;
      }

      equipoPuntajes[equipo.id] = nuevoValor;

      puntajeEl.classList.remove("score-increase", "score-decrease");
      void puntajeEl.offsetWidth;
      puntajeEl.textContent = nuevoValor;

      if (nuevoValor > puntajeAnterior) {
        puntajeEl.classList.add("score-increase");
      } else if (nuevoValor < puntajeAnterior) {
        puntajeEl.classList.add("score-decrease");
      }
    });

    currentQuestion++;
    if (currentQuestion > configData.preguntas.total) {
      setTimeout(mostrarResultadoFinal, 1000);
      return;
    }
    respuestasSeleccionadas = {};

    document.querySelectorAll(".equipo-botones button").forEach((btn) => {
      btn.classList.remove("selected");
    });

    document.getElementById("numeroPregunta").textContent = currentQuestion;
    actualizarTipoPregunta();
  }

  function mostrarResultadoFinal() {
    // Ocultar el botón de confirmar
    document.getElementById("confirmarBtn").style.display = "none";

    // Deshabilitar todos los botones de los equipos
    document.querySelectorAll(".equipo-botones button").forEach((btn) => {
      btn.disabled = true;
      btn.classList.add("disabled");
    });

    // Obtener y ordenar los equipos por puntaje
    const clasificacion = configData.equipos
      .map((equipo) => ({
        id: equipo.id,
        nombre: equipo.nombre,
        puntaje: equipoPuntajes[equipo.id],
      }))
      .sort((a, b) => b.puntaje - a.puntaje); // Ordenar por puntaje descendente

    // Determinar ganador(es)
    const maxPuntaje = clasificacion[0].puntaje;
    const ganadores = clasificacion.filter(
      (equipo) => equipo.puntaje === maxPuntaje
    );

    // Crear mensaje apropiado (singular o plural)
    let mensaje = "";
    if (ganadores.length === 1) {
      mensaje = `¡El equipo "${ganadores[0].nombre}" ha ganado con ${maxPuntaje} puntos!`;
    } else {
      const nombresGanadores = ganadores.map((e) => e.nombre).join('" y "');
      mensaje = `¡Empate! Los equipos "${nombresGanadores}" han empatado con ${maxPuntaje} puntos.`;
    }

    // Obtener las secciones principales
    const gameSection = document.getElementById("game-section");
    const resultadosSection = document.getElementById("resultados-section");

    // Crear la tabla de resultados
    let tablaHTML = `
      <div class="resultado-final">
        <h2>Resultados Finales</h2>
        <p class="mensaje-ganador">${mensaje}</p>
        
        <div class="tabla-resultados">
          <table>
            <thead>
              <tr>
                <th>Posición</th>
                <th>Equipo</th>
                <th>Puntaje</th>
              </tr>
            </thead>
            <tbody>
    `;

    // Agregar cada equipo a la tabla
    clasificacion.forEach((equipo, index) => {
      const esGanador = equipo.puntaje === maxPuntaje;
      tablaHTML += `
        <tr class="${esGanador ? "ganador" : ""}">
          <td>${index + 1}</td>
          <td>${equipo.nombre}</td>
          <td>${equipo.puntaje}</td>
        </tr>
      `;
    });

    tablaHTML += `
            </tbody>
          </table>
        </div>
        
        <div class="botones-finales">
          <button id="nuevaCompetencia" class="big-button">Nueva Competencia</button>
        </div>
      </div>
    `;

    // Animación de transición entre secciones
    gameSection.style.opacity = 0;

    setTimeout(() => {
      // Ocultar la sección de juego
      gameSection.style.display = "none";

      // Mostrar los resultados
      resultadosSection.innerHTML = tablaHTML;
      resultadosSection.style.display = "block";

      // Animar la aparición
      setTimeout(() => {
        resultadosSection.style.opacity = 1;
      }, 50);

      // Añadir event listener al botón
      document
        .getElementById("nuevaCompetencia")
        .addEventListener("click", () => {
          window.location.href = "index.html";
        });
    }, 500);

    // IMPORTANTE: Eliminar cualquier elemento resultado-final previo
    const existingResult = document.querySelector(
      ".resultado-final:not(.tabla-resultados .resultado-final)"
    );
    if (existingResult && existingResult.parentNode) {
      existingResult.parentNode.removeChild(existingResult);
    }
  }
}

function checkLocalStorage() {
  try {
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    return true;
  } catch (e) {
    alert(
      "Tu navegador no soporta almacenamiento local. La aplicación podría no funcionar correctamente."
    );
    return false;
  }
}

document.addEventListener("DOMContentLoaded", checkLocalStorage);
