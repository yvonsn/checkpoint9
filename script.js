// PROGRAMA: RESTAURANTE BOTTEGA (Gestor de pedidos)
// =================================================

// Mensajes aleatorios del camarero
const mensajes = [
  "¡Excelente elección!",
  "Ese plato es el más solicitado.",
  "Muy buena combinación.",
  "Nuestro chef recomienda esa opción.",
  "¡Le encantará ese plato!",
  "La especialidad de la casa.",
];

// Función para obtener un mensaje aleatorio
function mensajeAleatorio() {
  let random = mensajes[Math.floor(Math.random() * mensajes.length)];
  return random;
}

// Función para construir el texto del menú completo al inicio del programa
function construirMenuCompleto(titulo, menu) {
  let texto = `${titulo}\n\n`;

  for (let categoria in menu) {
    texto += `${categoria.toUpperCase()}: `;

    for (let plato in menu[categoria]) {
      texto += `${plato}, `;
    }
    texto += `\n`;
  }
  return texto;
}

//función para pedir una opción al usuario
function pedirOpcion(menu, titulo, recargo = 0) {
  let mensaje = `${titulo}\n\n`;

  //texto del menú
  for (let plato in menu) {
    mensaje += `${plato} - ${menu[plato] + recargo}€ \n`;
  }
  mensaje += `\n¿Qué plato deseas elegir?`;
  while (true) {
    let eleccion = prompt(mensaje);
    // Si el usuario canceló, se sale de la función
    if (eleccion === null) {
      return null;
    }

    eleccion = eleccion.trim();

    for (let plato in menu) {
      if (plato.toLowerCase() === eleccion.toLowerCase()) {
        alert(mensajeAleatorio());

        return {
          nombre: plato,
          precio: menu[plato] + recargo,
        };
      }
    }
    alert("Opción no válida. Por favor, elige un plato del menú.");
  }
}

function personalizarPlato(plato) {
  let personalizar = confirm(`¿Deseas personalizar ${plato.nombre}?`);

  if (!personalizar) {
    return plato; // Si no desea personalizar, se devuelve el plato original
  }
  let opciones =
    "PERSONALIZACIÓN:\n\n" +
    "1. Extra mariscos (+4€)\n" +
    "2. Extra picante (+2€) \n" +
    "3. Extra lomo (+4€) \n" +
    "4. Sin personalización \n";

  let eleccion = prompt(opciones);
  switch (eleccion) {
    case "1":
      plato.nombre += " con extra mariscos";
      plato.precio += 4;
      break;

    case "2":
      plato.nombre += " con extra picante";
      plato.precio += 2;
      break;

    case "3":
      plato.nombre += " con extra lomo";
      plato.precio += 4;
      break;

    default:
      break;
  }
  return plato;
}

// Función para gestionar los extras
function gestionarExtras(tipoMenu, pedidoBase, recargo = 0) {
  let elegirExtras = confirm("Desea añadir algún extra?");

  if (elegirExtras) {
    let extra = validarCancelacion(pedirOpcion(extras, " EXTRAS: "));

    pedidoBase.extra = extra;
  }
  factura(tipoMenu, pedidoBase);
}

// Función para mostrar la factura
function factura(titulo, pedido) {
  let textoFactura = `Estos son los platos del menú "${titulo}" que usted eligió:\n\n`;

  let total = 0;

  for (let categoria in pedido) {
    let item = pedido[categoria];

    if (item !== null) {
      textoFactura += `${categoria.toUpperCase()}: ${item.nombre} --> ${item.precio} €\n`;

      total += item.precio;
    }
  }

  textoFactura += `\nTOTAL: ${total} €`;

  alert(textoFactura);
}

// Función para validar cancelación o entrada vacía
function validarCancelacion(opcion) {
  if (opcion === null) {
    throw new Error("Pedido cancelado. Gracias por visitarnos");
  }
  return opcion;
}

// Función para convertir hora en formato HH:mm a minutos totales
function convertirHoraMinutos(hora) {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

// Función para validar el formato de la hora (HH:mm)
function validarhora(hora) {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(hora);
}

// declaración de los menús
const desayuno = {
  principales: {
    "Pan con Chicharrón": 14,
    "Huevo frito con tocino": 9,
    "Tortilla francesa": 8,
  },
  acompanamientos: {
    "Café": 2.5,
    "Infusiones": 2,
    "Jugo": 3,
    "Pan": 1.5,
  },
};

const almuerzo = {
  principales: {
    "Lomo Saltado": 15,
    "Jalea": 16,
    "Pollo a la Brasa": 18,
    "Ceviche": 17,
    "Ají de Gallina": 16,
  },
  acompanamientos: {
    "Causa Limeña": 5,
    "Papa a la Huancaina": 4,
    "Ensalada": 3,
    "Papa Rellena": 3.5,
    "Anticuchos": 6,
  },
  postres: {
    "Mazamorra Morada": 5,
    "Torta tres leches": 4,
    "Picarones": 6,
    "Suspiro a la Limeña": 4,
    "Helado de lúcuma": 5,
  },
};

const extras = {
  "Papas Fritas": 2.5,
  "Sarsa Criolla": 2,
  "Chicha Morada": 3,
  "Pisco Sour": 5,
  "Cerveza Cusqueña": 4,
};

// Horarios del restaurante
const horarios = {
  apertura: "07:00",
  desayunoFin: "11:00",
  almuerzoFin: "17:00",
  cierre: "22:00",
};

// Para simplificar, el menú de cena es igual al de almuerzo
const cena = almuerzo;

// Recargo para el menú de cena
const recargoCena = 5;

try {
  // PEDIR HORA
  alert("BIENVENIDO AL RESTAURANTE BOTTEGA.");
  let hora = prompt("Por favor, ingrese la hora en formato HH:mm (24 horas):");

  // VALIDAR CANCELAR O VACÍO
  if (hora === null || hora.trim() === "") {
    throw new Error("Operación cancelada por el usuario.");
  }

  // VALIDAR FORMATO
  if (!validarhora(hora)) {
    let continuar = confirm(
      "Formato inválido.\nDebe usar HH:mm\n\n¿Deseas intentar nuevamente?",
    );

    if (continuar) {
      location.reload();
    } else {
      alert("Gracias por visitarnos");
    }
  } else {
    // HORARIOS
    let horaActual = convertirHoraMinutos(hora);

    let apertura = convertirHoraMinutos(horarios.apertura);
    let desayunoFin = convertirHoraMinutos(horarios.desayunoFin);
    let almuerzoFin = convertirHoraMinutos(horarios.almuerzoFin);
    let cierre = convertirHoraMinutos(horarios.cierre);

    if (horaActual < apertura || horaActual > cierre) {
      let continuar = confirm(
        "Lo siento, el restaurante está cerrado en este momento.\n\n¿Deseas intentar con otra hora?",
      );

      if (continuar) {
        location.reload();
      } else {
        alert("Gracias por visitarnos");
      }
    }

    // DESAYUNO
    else if (horaActual <= desayunoFin) {
      alert(
        construirMenuCompleto(
          "Bienvenido/a!!, el menú que le corresponde es del DESAYUNO",
          desayuno,
        ),
      );
      let principal = personalizarPlato(
        validarCancelacion(pedirOpcion(desayuno.principales, "PRINCIPALES:")),
      );

      let acompanamiento = validarCancelacion(
        pedirOpcion(desayuno.acompanamientos, "ACOMPAÑAMIENTOS:"),
      );

      gestionarExtras("Desayuno", {
        principal,
        acompanamiento,
      });

      // ALMUERZO
    } else if (horaActual <= almuerzoFin) {
      alert(
        construirMenuCompleto(
          "Bienvenido/a!!, el menú que le corresponde es del ALMUERZO",
          almuerzo,
        ),
      );
      let principal = personalizarPlato(
        validarCancelacion(pedirOpcion(almuerzo.principales, "PRINCIPALES:")),
      );

      let acompanamiento = validarCancelacion(
        pedirOpcion(almuerzo.acompanamientos, "ACOMPAÑAMIENTOS:"),
      );

      let postre = validarCancelacion(
        pedirOpcion(almuerzo.postres, "POSTRES:"),
      );

      gestionarExtras("Almuerzo", {
        principal,
        acompanamiento,
        postre,
      });
    }

    // CENA
    else {
      alert(
        construirMenuCompleto(
          "Bienvenido/a!!, el menú que le corresponde es de la CENA",
          cena,
        ),
      );
      let principal = personalizarPlato(
        validarCancelacion(
          pedirOpcion(cena.principales, "PRINCIPALES:", recargoCena),
        ),
      );

      let acompanamiento = validarCancelacion(
        pedirOpcion(cena.acompanamientos, "ACOMPAÑAMIENTOS:", recargoCena),
      );

      let postre = validarCancelacion(
        pedirOpcion(cena.postres, "POSTRES:", recargoCena),
      );

      gestionarExtras(
        "Cena",
        {
          principal,
          acompanamiento,
          postre,
        },
        recargoCena,
      );
    }
  }
} catch (error) {
  alert(error.message);
}
