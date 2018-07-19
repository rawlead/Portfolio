import * as M from 'materialize-css';


function initialize() {
    document.addEventListener('DOMContentLoaded', () => {
        const elems = document.querySelectorAll('.parallax');
        M.Parallax.init(elems);
    });

}

export default initialize();