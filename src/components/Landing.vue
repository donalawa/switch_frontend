<template>
  <div class="landing-page">
    <img :src="info.bgImgUrl" />
    <div class="bg" :style="{backgroundColor: info.secondaryColor}"></div>
    <div class="content">
      <img :src="info.logoImgUrl" alt="" class="logo" />
      <h1 style="color: #fff">{{ info.title_en }}</h1>
      <p style="color: #fff">{{ info.description_en }}</p>
      <a class="btn" :style="{backgroundColor: info.primaryColor}" @click.prevent="this.$emit('start_question')"
        >Start Calculator</a
      >
      <p style="color: #fff">
        <span
          >To change the language
          <a :style="{color: info.primaryColor}" href="">click here</a></span
        >
      </p>

      <div class="icon-flex">
        <ul>
          <li>
            <a :style="{backgroundColor: info.primaryColor}" href="">
              <i class="fab fa-facebook" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a :style="{backgroundColor: info.primaryColor}" href="">
              <i class="fab fa-instagram" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a :style="{backgroundColor: info.primaryColor}">
              <i class="fab fa-twitter" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import DataService from '../services/SwitchApi';

export default {
  data() {
    return {
    };
  },
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  created() {

  }
};
</script>

<style lang="css" scoped>
.content > h1 {
    animation: float-title 8s ease-in-out infinite;
}

@keyframes float-title {
	0% {
		
		transform: translatey(0px);
	}
	50% {
		transform: translatey(-13px);
	}
	100% {
		transform: translatey(0px);
	}
}

.landing-page {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.btn:hover {
    cursor: pointer;
}
.landing-page > img {
  width: 100vw;
  height: 100vw;
  max-height: 100vh;
  object-fit: cover;
  object-position: center;
}
.landing-page .bg {
  width: 100vw;
  height: 100vh;
  opacity: 0.9;
  position: absolute;
  left: 0;
  top: 0;
}
.landing-page .content {
  width: 100vw;
  min-height: 100vh;
  display: grid;
  align-content: center;
  justify-items: center;
  position: absolute;
  left: 0;
  top: 0;
}
.landing-page .content .logo {
  height: auto;
  width: 300px;
  margin-bottom: 2rem;
}
.landing-page .content > h1 {
    text-align: center;
  font-size: 4rem;
  margin-bottom: 1.5rem;
}
.landing-page .content p {
  font-size: 1.3rem;
  line-height: 1.5;
  text-align: center;
}
.landing-page .content p span {
  font-weight: 600;
}
.landing-page .content p span a {
  text-decoration: none;
}
.landing-page .content a.btn {
  margin: 1rem 0;
  padding: 1rem 2rem;
}
.landing-page .content .icon-flex {
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
}
.landing-page .content .icon-flex ul {
  display: flex;
  align-items: center;
  justify-content: center;
}
.landing-page .content .icon-flex ul li {
  list-style-type: none;
}
.landing-page .content .icon-flex ul a {
  display: block;
  width: 50px;
  height: 50px;
  margin: 0 0.5rem;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  text-decoration: none;
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .landing-page > img {
    min-height: 100vh;
  }
  .landing-page .content h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
}

@media screen and (max-width: 767px) {
  .landing-page > img {
    min-height: 100vh;
  }
  .landing-page .content .logo {
    height: auto;
    width: 220px;
  }
  .landing-page .content h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
  }
  .landing-page .content p {
    font-size: 1rem;
  }
  .landing-page .content a.btn {
    padding: 0.5rem 1rem;
  }
  .landing-page .content .icon-flex ul a {
    display: block;
    width: 40px;
    height: 40px;
    margin: 0 0.5rem;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    text-decoration: none;
  }
}
</style>
