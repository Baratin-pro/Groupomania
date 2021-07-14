<template>
  <div>
    <form
      action=""
      class="main__contentForm__form"
      id="form"
      @submit="onSubmitLogin"
    >
      <div class="main__contentForm__form__fieldset">
        <input
          v-model="email"
          class="main__contentForm__form__fieldset__input"
          type="email"
          name="email"
          id="email"
          aria-required="true"
          placeholder="Email"
          aria-label="Email"
          aria-invalid="true"
          required
        />
      </div>
      <div class="main__contentForm__form__fieldset">
        <input
          @input="checkPassword"
          v-model="password"
          class="main__contentForm__form__fieldset__input"
          type="password"
          name="password"
          id="password"
          aria-required="true"
          placeholder="Mot de passe"
          aria-label="Mot de passe"
          aria-invalid="true"
          required
        />
      </div>
      <div class="main__contentForm__form__fieldset">
        <input
          class="
            btn
            main__contentForm__form__fieldset__input
            main__contentForm__form__fieldset__input--submit
            main__contentForm__form__fieldset__input--submit--login
          "
          type="submit"
          aria-label="Se connecter"
          value="Se connecter"
        />
      </div>
      <div class="main__contentForm__form__separator">OU</div>
      <div class="main__contentForm__form__fieldset">
        <input
          @click="toggleLogin(this.login)"
          class="
            btn
            main__contentForm__form__fieldset__input
            main__contentForm__form__fieldset__input--submit
            main__contentForm__form__fieldset__input--submit--signup
          "
          type="button"
          aria-label="Créer un compte"
          value="Créer un compte"
        />
      </div>
    </form>
    <transition name="appear">
      <div v-if="this.errors.length" class="main__contentForm__form errorMsg">
        <div class="errorMsg__title">
          <h2 v-if="this.errors.length > 1">
            Veuillez corriger les erreurs suivantes :
          </h2>
          <h2 v-else>Veuillez corriger l'erreur suivante :</h2>
        </div>
        <ul>
          <li
            v-for="error in errors"
            :key="error.message"
            class="errorMsg__advertisement"
          >
            ► {{ error.message }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "LoginCpt",
  el: "#form",
  data() {
    return {
      login: false,
      errorMsg: true,
      errors: [],
      email: null,
      password: null,
      passwordIsValid: false,
      characterRegex: null,
      numericCharacter: null,
      uppercaseCharacter: null,
    };
  },
  methods: {
    toggleLogin: function (boolean) {
      this.$emit("selected", boolean);
    },
    checkPassword: function () {
      this.errors = [];
      this.characterRegex = /[a-zA-Z]/.test(this.password);
      this.numericCharacter = /[0-9]/.test(this.password);
      this.uppercaseCharacter = /[A-Z]/.test(this.password);
      if (this.password) {
        if (this.password.length < 8 || this.password.length > 32) {
          this.errors.push({
            message: "Le mot de passe doit prendre entre 8 à 32 caractères !",
          });
        }
        if (!this.characterRegex) {
          this.errors.push({
            message: "Le mot de passe doit posséder au moins une lettre !",
          });
        }
        if (!this.numericCharacter) {
          this.errors.push({
            message: "Le mot de passe doit posséder au moins un chiffre !",
          });
        }
        if (!this.uppercaseCharacter) {
          this.errors.push({
            message: "Le mot de passe doit posséder au moins une majuscule !",
          });
        }
      } else {
        return (this.passwordIsValid = false);
      }
      if (this.errors.length === 0) {
        return (this.passwordIsValid = true);
      } else {
        return (this.passwordIsValid = false);
      }
    },
    onSubmitLogin: function (e) {
      this.errors = [];

      if (!this.email) {
        this.errors.push({ message: "Email incorrect !" });
      }
      if (!this.passwordIsValid) {
        this.errors.push({
          message: "Mot de passe incorrect !",
        });
      }

      if (this.passwordIsValid && this.email) {
        return true;
      }
      e.preventDefault();
    },
  },
};
</script>

<style>
.appear-enter-from {
  opacity: 0;
}
.appear-enter-to {
  opacity: 1;
}
.appear-enter-active {
  transition: all 1.5s ease;
}
.appear-leave-from {
  opacity: 1;
}
.appear-leave-to {
  opacity: 0;
}
.appear-leave-active {
  transition: all 1.5s ease;
}
</style>