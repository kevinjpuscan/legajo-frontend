<template>
  <div class="container-page">
    <div class="login-container">
      <div class="login-header">
        <h1>MUNICIPALIDAD PROVINCIAL DE CHOTA</h1>
        <h2>Sistema de Legajo</h2>
      </div>
      <form id="login-form" @submit.prevent="submit">
        <b-field label="Correo">
          <b-field>
            <b-input
              v-model="form.identifier"
              icon="email-outline"
              type="email"
              placeholder="example@example.com"
              name="email"
              required
            />
          </b-field>
        </b-field>
        <b-field label="Contraseña">
          <b-field>
            <b-input
              v-model="form.password"
              icon="lock-outline"
              password-reveal
              type="password"
              placeholder="****"
              name="password"
              required
            />
          </b-field>
        </b-field>
        <b-field>
          <b-field grouped>
            <div class="control">
              <Button native-type="submit" type="is-primary">
                Iniciar Sesión</Button
              >
            </div>
          </b-field>
        </b-field>
      </form>
    </div>
  </div>
</template>

<script>
import Button from '~/components/shared/Button.vue'
export default {
  layout: 'empty',
  components: {
    Button,
  },
  data: () => ({
    form: { identifier: '', password: '' },
  }),
  methods: {
    async submit() {
      try {
        await this.$store.dispatch('me/login', this.form)
        await this.$router.push('/')
      } catch (e) {
        const message = 'Usuario o contraseña invalida'
        this.$buefy.notification.open({
          message,
          type: 'is-danger',
          duration: 5000,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/scss/_theme-default';
.container-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-container {
    padding: 1rem 2rem;
    box-shadow: $navbar-box-shadow;
    max-width: 400px;
    width: 95%;
    margin: auto;

    .login-header {
      width: 100%;
      padding: 1rem 0;
      text-align: center;
      color: $primary;
      h1 {
        font-weight: bold;
      }
    }
  }
}
</style>
