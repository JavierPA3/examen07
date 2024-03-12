document.addEventListener("DOMContentLoaded", function () {
    /**J
     * Author: Postigo Arévalo Javier
     * Date: 2024.03.11
     */

    /** Nombre  titulo*/
    const $nameTitle = $('h1');
    $nameTitle.mouseover(function () { 
        $nameTitle.text("Postigo Arévalo, Javier");
        $nameTitle.fadeOut("slow").fadeIn("slow").css("background-color", "orange");
    });
    
 
    /**  Nombre TextArea */
    const textAreaForm = document.querySelector("textarea");
    textAreaForm.innerText = 'Postigo';

  
    /** Fecha DOM */
    const date = new Date().toLocaleDateString();
    const span = document.querySelector("h3 span");
    span.innerHTML = '(' +  date + ')';

    /** Colores Form */
    const formSelect = document.querySelector("form");
    const selectFormColor = document.querySelector("select");
    selectFormColor.addEventListener("change", function () {
        formSelect.style.backgroundColor = selectFormColor.value;
    });
    selectFormColor.dispatchEvent(new Event("change", { bubbles: true }));

    /** Ajax */
    const $formSelect = $('form');
    const $buttonSend = $('input[type=submit]');
    const $ajaxInput = $('input[type=text]');
    $ajaxInput.val("https://randomuser.me/api/");
    const $divs = $("<div></div>");
    $divs.insertBefore($buttonSend);
    $($ajaxInput).blur(function (e) { 
        $.ajax({
            type: "get",
            url: this.value,
            success: function (response) {
                $divs.text(response.results[0].location.country);
                $divs.addClass("pais");
            }
        });        
    });
    



    let regexpCrear = /(crea) (parrafo|párrafo|título|titulo) ?(.*)?/;
    let regexpBorrar = /(borra) (parrafo|párrafo|titulo|título)/;
    
    let form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let contenidoTextarea = textAreaForm.value;
        let divError = document.querySelectorAll('div')[0];
        let divApartado = document.querySelectorAll('div')[1];
        try {
            if (!regexpCrear.test(contenidoTextarea) && !regexpBorrar.test(contenidoTextarea)) {
                throw new Error('El formato no es válido. Debe ser "crea párrafo contenido", "crea título contenido", "borra párrafo" o "borra título"');
            }
            divError.innerHTML = '';
            divError.classList.remove('error');
        } catch (error) {
            divError.innerHTML = error.message;
            divError.classList.add('error');
        }
    
        const crearMatch = contenidoTextarea.match(regexpCrear);
        if (crearMatch) {
            const metodo = crearMatch[1];
            const tipo = crearMatch[2];
            let contenido = crearMatch[3] || '';
    
            if (metodo === 'crea') {
                if (contenido.trim() === '') {
                    contenido = new Date().toLocaleDateString();
                }
    
                const newElement = document.createElement(tipo === 'parrafo' || tipo === 'párrafo' ? 'p' : 'h1');
                newElement.textContent = contenido;
                divApartado.appendChild(newElement);
            }
        } else {
            const borrarMatch = contenidoTextarea.match(regexpBorrar);
            if (borrarMatch) {
                const metodo = borrarMatch[1];
                const tipo = borrarMatch[2];
                if (metodo === 'borra') {
                    const elements = divApartado.querySelectorAll(tipo === 'parrafo' || tipo === 'párrafo' ? 'p' : 'h1');
                    elements.forEach(element => {
                        element.remove();
                    });
                }
            }
        }
    });
});    
