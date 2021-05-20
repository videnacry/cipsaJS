import earthImg from './1earth.png'
import mercuryImg from './1mercury.png'
import venusImg from './1venus.png'
import marsImg from './1mars.png'
export const statement = <p><b>1.&ensp;</b>Crea una p&aacute;gina dotada de una serie de botones con los nombres "Mercurio", "Venus", "Tierra", "Marte", y una imagen. Cada vez que el usuario pulse uno de los botones deber&aacute; mostrarse la imagen correspondiente al planeta indicado Puedes descargar las im&aacute;genes de Google.</p>
const initialHTML = `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    </head>
    <body>
        <ul class="nav">
            <li class="nav-item">        
                <a href="#" data-id="first-card-mercury" class="nav-link">Mercury</a>
            </li>
            <li class="nav-item">            
                <a href="#" data-id="first-card-venus" class="nav-link">Venus</a>
            </li>
            <li class="nav-item">            
                <a href="#" data-id="first-card-earth" class="nav-link">Earth</a>
            </li>
            <li class="nav-item">            
                <a href="#" data-id="first-card-mars" class="nav-link">Mars</a>
            </li>
        </ul>
        <div class="row px-4 py-2">
            <div id="first-card-mercury" name="first-card-mercury" class="card col invisible">
                <div class="card-body">
                    <img src=${mercuryImg} class="img-fluid card-img-top"/>
                </div>
                <div class="card-footer text-center">
                    Image by <a href="https://pixabay.com/users/gookingsword-1861966/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1226433">GooKingSword</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1226433">Pixabay</a>
                </div>
            </div>
            <div id="first-card-venus" name="first-card-venus" class="card col invisible">
                <div class="card-body">
                    <img src=${venusImg} class="img-fluid card-img-top"/>
                </div>
                <div class="card-footer text-center">
                    Image by <a href="https://pixabay.com/users/wikiimages-1897/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=11022">WikiImages</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=11022">Pixabay</a>
                </div>
            </div>
            <div id="first-card-earth" name="first-card-earth" class="card col invisible">
                <div class="card-body">
                    <img src=${earthImg} class="img-fluid card-img-top"/>
                </div>
                <div class="card-footer text-center">
                    Image by <a href="https://pixabay.com/users/piro4d-2707530/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1617121">PIRO4D</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1617121">Pixabay</a>
                </div>
            </div>
            <div id="first-card-mars" name="first-card-mars" class="card col invisible">
                <div class="card-body">
                    <img src=${marsImg} class="img-fluid card-img-top"/>
                </div>
                <div class="card-footer text-center">
                    Image by <a href="https://pixabay.com/users/wikiimages-1897/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=11012">WikiImages</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=11012">Pixabay</a>
                </div>
            </div>
        </div>
    </body>
</html>
`
const initialJS = `
import('https://code.jquery.com/jquery-3.6.0.slim.min.js').then(() => {
    $('a').click(function(e) {
        e.preventDefault()
        $('#' + $(this).data('id')).toggleClass('invisible')
    })
})
`
export default ({CodeIframe}) => <CodeIframe initialJS={initialJS} initialHTML={initialHTML} name="events-first"/>