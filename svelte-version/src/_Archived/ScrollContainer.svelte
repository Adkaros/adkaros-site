<script>
    import Page from "../Page.svelte";
    import { onMount } from "svelte";

    let container;
    let canInput = true;

    let currentPage = 0;
    let numPages = 3;
    let yPos = 0;
    let cWidth = window.innerWidth;
    let cHeight = window.innerHeight;

    console.log('width: ', cWidth);
    console.log('height: ', cHeight);

    let isLandscape = false;
    let yDown = 0;

    window.addEventListener('resize', calibrate, true);
    window.addEventListener('orientationchange', calibrate, true);

    function calibrate() {
        if (window.orientation === -90 || window.orientation === 90) {
            isLandscape = true;
        }
        if (window.orientation === 0) {
            isLandscape = false;
        }

        setTimeout(() => {

        cWidth = window.innerWidth;
        cHeight = window.innerHeight;

        console.log('width: ', cWidth);
        console.log('height: ', cHeight);

        yPos = currentPage * cHeight;
        container.style.transform = "translateY(-" + yPos + "px)";

        var pages = container.children;

        // container.style.width = ((isLandscape) ? cHeight : cWidth)+"px";
        // container.style.height = ((isLandscape) ? cWidth : cHeight)+"px";

        // for (var i = 0; i < pages.length; i++) {
        //     pages[i].style.width = ((isLandscape) ? cHeight : cWidth)+"px";
        //     pages[i].style.height = ((isLandscape) ? cWidth : cHeight)+"px";
        // }

    }, 50);
    }

    window.addEventListener("wheel", (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (e.deltaY > 0) {
                //console.log("scroll down");
                onScroll(e, false);
            } else {
                //console.log("scroll up");
                onScroll(e, true);
            }
        },{ passive: false });


    window.addEventListener("touchstart", (e) => {
        const firstTouch = getTouches(e)[0];                                      
        //xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY;
    });

    window.addEventListener("touchmove", (e) => {
        console.log("touch: ", e.touches[0].clientY);

        if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp; 
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
            console.log("left swipe");
            wasSwipe = true;
            pc.Application.getApplication().fire('carousel:swipeleft');

        } else {
            /* right swipe */
            console.log("right swipe");
            wasSwipe = true;
            pc.Application.getApplication().fire('carousel:swiperight');
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
        } else { 
            /* down swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;  
    });

    function onScroll(e, up) {
        if (!canInput) {
            return;
        }
        canInput = false;

        currentPage = up
            ? currentPage === 0
                ? currentPage : currentPage - 1
            : currentPage === numPages - 1
                ? currentPage : currentPage + 1;
        yPos = currentPage * cHeight;
        container.style.transform = "translateY(-" + yPos + "px)";

        setTimeout(() => {
            canInput = true;
        }, 500);
    }
</script>

<div id="scrollContainer" bind:this={container}>
    <Page id={0} bgColor={'#764B8E'} headerText={"Andrew Karos"} currentPage={currentPage}/>
    <Page id={1} bgColor={'#582A71'} headerText={"Projects"} currentPage={currentPage}/>
    <Page id={2} bgColor={'#27043A'} headerText={"About"} currentPage={currentPage}/>

    <!-- <div id="page" style="background-color: #764B8E; font-size: 10vw;">
        Hello
    </div>
    <div id="page" style="background-color: #582A71; font-size: 10vw;">
        Welcome
    </div>
    <div id="page" style="background-color: #27043A; font-size: 10vw;">
        I'm Andrew.
    </div> -->
</div>

<style>
    #scrollContainer {
        position: absolute;
        width: 100vw;
        height: 100vh;
        /* overflow: hidden; */

        transition: transform 0.5s cubic-bezier(0.61, 1, 0.88, 1);
        transform: translateY(0px);

        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
    #scrollContainer::-webkit-scrollbar {
        display: none;
    }

    #page {
        font-size: 10vw;
        color: white;

        width: 100vw;
        height: 100vh;
    }
</style>
