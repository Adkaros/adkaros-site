<script>
export let id = 0;
export let bgColor;
export let headerText;
export let currentPage;

let focused = false;
let headerOffset = -100;
let subHeaderOffset = -200;

$: if (currentPage === id) {
    setTimeout(() => {
        focused = true;
    }, 500);
} else {
    focused = false;
}
</script>

<div id="page" style="background-color: {bgColor};">
    <div id="viewport">
        <div id="header" style="transform: translateY({focused ? "0.002vh" : headerOffset+"px"}); opacity: {focused?1:0}">
            {headerText}
        </div>
        <div id="sub-header" style="transform: translateY({focused ? "0" : subHeaderOffset}px); opacity: {focused?1:0}">
            {headerText}
        </div>

        <div id="title-header" style="transform: translate3d(200px, {focused ? "20vh" : "500px"}, 0px); opacity: {focused?1:0}">
            {"Creative Coder"}
        </div>

    {#if id === 0}
        <img id="arrow" src="height-icon.png" 
        alt="Scroll Up/Down" style="transform: translateY({focused ? "0" : -headerOffset}px); opacity: {focused?1:0}"/>
    {/if}
    </div>

</div>

<style>
    #page {
        /* background-image: url(../domain.png);
        background-size: cover; */

        font-size: 10vw;
        color: white;

        width: 100vw;
        height: 100vh;

        display: grid;
        position: relative;
        grid-template-columns: 10vw 80vw 10vw;
        grid-template-rows: 10vh 80vh 10vh;
    }

    #arrow {
        position: absolute;
        bottom: 10%;
        font-size: 1vw;
        min-width: 35px;
        min-height: 35px;
        width: 5.5vw;
        height: 5.5vh;
        object-fit: contain;

        transition: all 0.5s cubic-bezier(0.61, 1, 0.88, 1);
        transform: translateY(0px);
    }

    #viewport {
        grid-column: 2;
        grid-row: 2;
    }

    #header {
        font-size: 2vw;
        position: absolute;

        transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
        transition-delay: 1s;
        transform: translateY(0px);
    }

    #sub-header {
        position: absolute;

        transition: all 0.5s cubic-bezier(0.45, 0, 0.55, 1);
        transform: translateY(0px);
    }

    #title-header {
        font-size: 2.5vw;
        position: absolute;

        transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
        transition-delay: 1s;
        transform: translateY(0px);
    }
</style>
