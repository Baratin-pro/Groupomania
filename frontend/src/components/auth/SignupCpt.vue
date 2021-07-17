<template>
  <div>
    <form class="main__contentForm__form" id="form" @submit="onSubmitSignup">
      <div class="main__contentForm__form__fieldset">
        <input
          @input="checkFirstname"
          v-model="user.firstname"
          class="main__contentForm__form__fieldset__input"
          type="text"
          name="firstname"
          id="firstname"
          aria-required="true"
          placeholder="Prénom"
          aria-label="Prénom"
          aria-invalid="true"
          required
        />
      </div>
      <div class="main__contentForm__form__fieldset">
        <input
          @input="checkLastname"
          v-model="user.lastname"
          class="main__contentForm__form__fieldset__input"
          type="text"
          name="lastname"
          id="lastname"
          aria-required="true"
          placeholder="Nom de famille"
          aria-label="Nom de famille"
          aria-invalid="true"
          required
        />
      </div>
      <div class="main__contentForm__form__fieldset">
        <input
          v-model="user.email"
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
          v-model="user.password"
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
          @input="checkConfirmPassword"
          v-model="user.confirmationPassword"
          class="main__contentForm__form__fieldset__input"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          aria-required="true"
          placeholder="Confirmation du mot de passe"
          aria-label="Confirmation du mot de passe"
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
          aria-label="S'inscrire"
          value="S'inscrire"
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
          aria-label="Déja un compte ?"
          value="Déjà un compte ?"
        />
      </div>
      <transition name="responseServerTransition"
        ><span
          class="
            btn
            main__contentForm__form__fieldset__input
            main__contentForm__form__fieldset__input--submit
            main__contentForm__form__fieldset__input--responseServer
          "
          v-bind:class="{
            responseServerIsValid: responseServerIsValid,
            responseServerIsErr: responseServerIsErr,
          }"
          v-if="this.responseServer"
          >{{ this.responseServer }}
        </span></transition
      >
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
import axios from "axios";
export default {
  name: "SignuCpt",
  el: "#form",
  data() {
    return {
      login: true,
      errorMsg: true,
      errors: [],
      user: {
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        confirmationPassword: null,
      },

      firstnameIsValid: false,
      lastnameIsValid: false,
      passwordIsValid: false,
      confirmPasswordIsValid: false,

      characterRegex: null,
      numericCharacter: null,
      uppercaseCharacter: null,
      numberRegex: null,

      responseServer: null,
      responseServerIsValid: false,
      responseServerIsErr: true,
      checkEmail: null,
    };
  },
  methods: {
    toggleLogin: function (boolean) {
      this.$emit("selected", boolean);
    },

    checkFirstname: function () {
      this.errors = [];
      let tabOcc = [];
      let regex = /[A-Za-z-]/gi;
      if (
        this.user.firstname.slice(0, 1) === "-" ||
        this.user.firstname.slice(-1) === "-"
      ) {
        this.errors.push({
          message: "Le tiret ne peut être la première lettre ni la dernière !",
        });
      }
      for (let i = 0; i < this.user.firstname.length; i++) {
        let letter = this.user.firstname[i];
        if (letter === "-") {
          tabOcc.push(letter);
        }
      }
      if (tabOcc.length > 1) {
        this.errors.push({
          message: "Le nombre de tiret ne peut dépasser 1 !",
        });
      }
      let leaveString = this.user.firstname.replaceAll(regex, "");
      let leaveSpace = leaveString.replaceAll(" ", "");
      this.characterRegex = [...new Set(leaveSpace.split(""))];
      if (this.characterRegex.length) {
        this.errors.push({
          message: "Le prénom doit posséder que des lettres  !",
        });
      }

      if (this.errors.length === 0 && this.user.firstname) {
        return (this.firstnameIsValid = true);
      } else {
        return (this.firstnameIsValid = false);
      }
    },
    checkLastname: function () {
      this.errors = [];
      let tabOcc = [];
      let regex = /[A-Za-z-]/gi;
      if (
        this.user.lastname.slice(0, 1) === "-" ||
        this.user.lastname.slice(-1) === "-"
      ) {
        this.errors.push({
          message: "Le tiret ne peut être la première lettre ni la dernière !",
        });
      }
      for (let i = 0; i < this.user.lastname.length; i++) {
        let letter = this.user.lastname[i];
        if (letter === "-") {
          tabOcc.push(letter);
        }
      }
      if (tabOcc.length > 1) {
        this.errors.push({
          message: "Le nombre de tiret ne peut dépasser 1 !",
        });
      }
      let leaveString = this.user.lastname.replaceAll(regex, "");
      let leaveSpace = leaveString.replaceAll(" ", "");
      this.characterRegex = [...new Set(leaveSpace.split(""))];
      if (this.characterRegex.length) {
        this.errors.push({
          message: "Le nom de famille doit posséder que des lettres  !",
        });
      }

      if (this.errors.length === 0 && this.user.lastname) {
        return (this.lastnameIsValid = true);
      } else {
        return (this.lastnameIsValid = false);
      }
    },
    checkPassword: function () {
      this.errors = [];
      this.characterRegex = /[a-zA-Z]/.test(this.user.password);
      this.numericCharacter = /[0-9]/.test(this.user.password);
      this.uppercaseCharacter = /[A-Z]/.test(this.user.password);
      if (this.user.password) {
        if (this.user.password.length < 8 || this.user.password.length > 32) {
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
    checkConfirmPassword: function () {
      this.errors = [];
      if (this.user.confirmationPassword) {
        if (this.user.confirmationPassword != this.user.password) {
          this.errors.push({
            message: "Confirmation du mot de passe incorrect !",
          });
        }
      } else {
        return (this.confirmPasswordIsValid = false);
      }
      if (this.errors.length === 0) {
        return (this.confirmPasswordIsValid = true);
      } else {
        return (this.confirmPasswordIsValid = false);
      }
    },
    onSubmitSignup: function (e) {
      this.errors = [];

      if (!this.firstnameIsValid) {
        this.errors.push({
          message: "Prénom incorrect !",
        });
      }
      if (!this.lastnameIsValid) {
        this.errors.push({
          message: "Nom de famille incorrect !",
        });
      }

      if (!this.user.email) {
        this.errors.push({ message: "Email incorrect !" });
      }
      if (!this.passwordIsValid) {
        this.errors.push({
          message: "Mot de passe incorrect !",
        });
      }
      if (!this.confirmPasswordIsValid) {
        this.errors.push({
          message: "Confirmation du mot de passe incorrect !",
        });
      }

      if (
        this.firstnameIsValid &&
        this.lastnameIsValid &&
        this.passwordIsValid &&
        this.confirmPasswordIsValid &&
        this.user.email
      ) {
        axios
          .post("http://localhost:3000/api/user/signup", this.user)

          .then((response) => {
            this.responseServerIsErr = false;
            this.responseServerIsValid = true;
            this.responseServer = response.data.message;
            setTimeout(() => this.$router.push({ name: "Home" }), 1500);
          })
          .catch((err) => {
            this.checkEmail = this.user.email.slice(-3);
            this.responseServerIsErr = true;
            this.responseServerIsValid = false;
            switch (this.checkEmail) {
              case ".fr":
              case "com":
              case "net":
                this.responseServer = err.response.data.message;
                break;
              default:
                this.responseServer = "email invalide";
            }
          });
      }
      e.preventDefault();
    },
  },
};
</script>

<style>
.responseServerTransition-enter-from,
.appear-enter-from {
  opacity: 0;
  transform: scale(1);
}
.responseServerTransition-enter-to,
.appear-enter-to {
  opacity: 1;
}

.responseServerTransition-enter-active,
.appear-enter-active {
  transition: all 1.5s ease;
}
.responseServerTransition-leave-from,
.appear-leave-from {
  opacity: 1;
}
.responseServerTransition-leave-to,
.appear-leave-to {
  opacity: 0;
  transform: scale(1);
}
.responseServerTransition-leave-active,
.appear-leave-active {
  transition: all 1.5s ease;
}

.responseServerTransition-enter-to {
  transform: scale(1.9);
}
.responseServerTransition-leave-to {
  transform: scale(1.9);
}
</style>
