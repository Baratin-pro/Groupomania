<template>
  <div>
    <form
      action=""
      method="POST"
      class="main__contentForm__form"
      id="form"
      @submit="onSubmitSignup"
      @click="errorMsgVisibility = !errorMsgVisibility"
    >
      <div class="main__contentForm__form__fieldset">
        <input
          @input="checkFirstname"
          v-model="firstname"
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
          v-model="lastname"
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
          @input="checkConfirmPassword"
          v-model="confirmPassword"
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
            main__contentForm__form__fieldset__input
            main__contentForm__form__fieldset__input--submit
            main__contentForm__form__fieldset__input--submit--signup
          "
          type="button"
          aria-label="Déja un compte ?"
          value="Déjà un compte ?"
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
  name: "SignuCpt",
  el: "#form",
  data() {
    return {
      login: true,
      errorMsg: true,
      errors: [],
      firstname: null,
      lastname: null,
      email: null,
      password: null,
      confirmPassword: null,
      firstnameIsValid: false,
      lastnameIsValid: false,
      passwordIsValid: false,
      confirmPasswordIsValid: false,
      characterRegex: null,
      numericCharacter: null,
      uppercaseCharacter: null,
      numberRegex: null,
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
        this.firstname.slice(0, 1) === "-" ||
        this.firstname.slice(-1) === "-"
      ) {
        this.errors.push({
          message: "Le tiret ne peut être la première lettre ni la dernière !",
        });
      }
      for (let i = 0; i < this.firstname.length; i++) {
        let letter = this.firstname[i];
        if (letter === "-") {
          tabOcc.push(letter);
        }
      }
      if (tabOcc.length > 1) {
        this.errors.push({
          message: "Le nombre de tiret ne peut dépasser 1 !",
        });
      }
      let leaveString = this.firstname.replaceAll(regex, "");
      let leaveSpace = leaveString.replaceAll(" ", "");
      this.characterRegex = [...new Set(leaveSpace.split(""))];
      if (this.characterRegex.length) {
        this.errors.push({
          message: "Le prénom doit posséder que des lettres  !",
        });
      }

      if (this.errors.length === 0 && this.firstname) {
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
        this.lastname.slice(0, 1) === "-" ||
        this.lastname.slice(-1) === "-"
      ) {
        this.errors.push({
          message: "Le tiret ne peut être la première lettre ni la dernière !",
        });
      }
      for (let i = 0; i < this.lastname.length; i++) {
        let letter = this.lastname[i];
        if (letter === "-") {
          tabOcc.push(letter);
        }
      }
      if (tabOcc.length > 1) {
        this.errors.push({
          message: "Le nombre de tiret ne peut dépasser 1 !",
        });
      }
      let leaveString = this.lastname.replaceAll(regex, "");
      let leaveSpace = leaveString.replaceAll(" ", "");
      this.characterRegex = [...new Set(leaveSpace.split(""))];
      if (this.characterRegex.length) {
        this.errors.push({
          message: "Le nom de famille doit posséder que des lettres  !",
        });
      }

      if (this.errors.length === 0 && this.lastname) {
        return (this.lastnameIsValid = true);
      } else {
        return (this.lastnameIsValid = false);
      }
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
    checkConfirmPassword: function () {
      this.errors = [];
      if (this.confirmPassword) {
        if (this.confirmPassword != this.password) {
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

      if (!this.email) {
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
        this.email
      ) {
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
