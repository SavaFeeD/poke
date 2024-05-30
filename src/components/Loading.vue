<template>
  <div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
</template>

<style scoped>
.lds-grid,
.lds-grid div {
  box-sizing: border-box;
}
.lds-grid {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;
}
.lds-grid div {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: white;
  animation: lds-grid 1.2s linear infinite;
}
.lds-grid div:nth-child(1) {
  top: 0px;
  left: 0px;
  animation-delay: 0s;
}
.lds-grid div:nth-child(2) {
  top: 0px;
  left: 15px;
  animation-delay: -0.4s;
}
.lds-grid div:nth-child(3) {
  top: 0px;
  left: 30px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(4) {
  top: 15px;
  left: 0px;
  animation-delay: -0.4s;
}
.lds-grid div:nth-child(5) {
  top: 15px;
  left: 15px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(6) {
  top: 15px;
  left: 30px;
  animation-delay: -1.2s;
}
.lds-grid div:nth-child(7) {
  top: 30px;
  left: 0px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(8) {
  top: 30px;
  left: 15px;
  animation-delay: -1.2s;
}
.lds-grid div:nth-child(9) {
  top: 30px;
  left: 30px;
  animation-delay: -1.6s;
}
@keyframes lds-grid {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>