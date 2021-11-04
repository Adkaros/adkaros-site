<script>
</script>

<div id="container">
	<div id="box" />
</div>

<style>
	#container {
		width: 50%;
		height: 50%;
		margin: auto;

		transform: translateY(50%);
	}

	#box {
		width: 100%;
		height: 100%;
		margin: auto;
		background-color: #8377d1;

		transform: perspective(1500px);
		border-radius: 1rem;
		box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
		transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0s;
	}

	#box:hover {
		background-color: #5EFC8D;
		border-radius: 15rem;
		transform: perspective(3000px) scale(1.2) rotate(15deg);
	}
</style>
