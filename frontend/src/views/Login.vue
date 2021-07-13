<template>
  <div class="body">
    <HeaderCpt></HeaderCpt>
    <main class="main">
      <aside class="main__contentAside">
        <img
          class="main__contentAside__img"
          src="../assets/telephone.png"
          alt=""
        />
        <div class="main__contentAsideBackgroungBot__img">
          <img src="../assets/reseau.jpg" alt="" />
        </div>
        <div class="main__contentAsideBackgroungTop__img">
          <img src="../assets/icon-above-font.png" alt="" />
        </div>
      </aside>
      <section class="main__contentForm">
        <div v-if="login">
          <LoginCpt v-on:selected="saveValue($event)"></LoginCpt>
        </div>
        <div v-else>
          <SignupCpt v-on:selected="saveValue($event)"></SignupCpt>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import HeaderCpt from "../components/HeaderCpt";
import LoginCpt from "../components/auth/LoginCpt";
import SignupCpt from "../components/auth/SignupCpt";

export default {
  name: "Login",
  components: { HeaderCpt, LoginCpt, SignupCpt },
  data() {
    return {
      login: false,
    };
  },
  methods: {
    saveValue(boolean) {
      this.login = boolean;
    },
  },
};
</script>

<style>
.body {
  background-color: rgb(241, 241, 241);
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  margin: 10px 0;
  display: flex;
  flex: 1;
}

/* ------------ Aside ------------ */

.main__contentAside {
  display: none;
}
@media only screen and (min-width: 900px) {
  .main__contentAside {
    display: block;
    position: relative;
    flex: 1;
    height: 450px;
    margin: 25px 0;
  }
  .main__contentAside__img {
    margin: auto;
    height: 500px;
    width: 320px;
  }
  .main__contentAsideBackgroungBot__img {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5%;
    margin: auto;
    width: 251px;
    z-index: 10;
  }
  .main__contentAsideBackgroungTop__img {
    position: absolute;
    left: 0;
    right: 0;
    top: 17%;
    margin: auto;
    width: 141px;
    z-index: 10;
  }
  .main__contentAsideBackgroungTop__img img {
    width: 90%;
  }
}

/* ------------ Form ------------ */

.main__contentForm {
  flex: 1;
}

.main__contentForm__form {
  margin: 3% auto;
  max-width: 450px;
  max-height: 450px;
  border: 1px solid #ccd0d5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  background-color: #ffffff;
}

.main__contentForm__form__fieldset {
  position: relative;
  color: #8d949e;
}

.main__contentForm__form__fieldset__input {
  border: 1px solid #ccd0d5;
  border-radius: 5px;
  margin: 12px 10px 0;
  background: #f5f6f7;
  width: 70%;
  height: 30px;
  font-size: 16px;
  line-height: 16px;
  padding: 0 5px;
}

/* ------------ Form_Submit ------------ */

.main__contentForm__form__fieldset__input--submit {
  color: #ffffff;
  font-weight: bold;
}
.main__contentForm__form__fieldset__input--submit--login {
  background-color: rgba(55, 55, 156, 1);
}
.main__contentForm__form__fieldset__input--submit--signup {
  background-color: #2f851e;
  margin-bottom: 12px;
}

/* ------------ Form_Separator ------------ */

.main__contentForm__form__separator {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  color: #575757;
  font-weight: 300;
}
.main__contentForm__form__separator::before,
.main__contentForm__form__separator::after {
  display: block;
  content: "";
  height: 0.2px;
  width: 25%;
  margin: 0 5%;
  background-color: #575757;
  transform: translate(0%, 100%);
}

/* ------------ errorMsg ------------ */
.errorMsg {
  max-width: 450px;
  max-height: 450px;
  border: 2px solid rgb(255, 0, 0);
  padding: 5px;
  text-align: start;
}

.errorMsg__title {
  color: #aa2121;
  font-weight: bold;
  margin-bottom: 12px;
  text-align: center;
}
</style>
