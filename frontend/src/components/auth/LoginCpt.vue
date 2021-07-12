<template>
  <form action="" class="main__contentForm__form">
    <div class="main__contentForm__form__fieldset">
      <input
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
</template>
<script>
export default {
  name: "LoginCpt",
  data() {
    return {
      login: false,
    };
  },
  methods: {
    toggleLogin: function (boolean) {
      this.$emit("selected", boolean);
    },
  },
};
</script>