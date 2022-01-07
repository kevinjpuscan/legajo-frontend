<template>
  <Wrapper>
    <div class="worker-profile">
      <section class="worker-information">
        <div class="information-group">
          <div>
            <h1>Información Personal</h1>
          </div>

          <div class="information-list">
            <Information />
            <Information />
            <Information />
            <Information />
          </div>
        </div>
        <div class="information-group">
          <div>
            <h1>Información Laboral</h1>
          </div>

          <div class="information-list">
            <Information />
            <Information />
            <Information />
            <Information />
          </div>
        </div>
      </section>
      <section class="worker-actions">
        <div class="worker-photo">
          <picture>
            <b-image
              :src="image"
              alt="The Buefy Logo"
              ratio="1by1"
              :rounded="true"
            ></b-image>
          </picture>
        </div>
        <div class="worker-actions-list">
          <Button disabled>Cambiar Photo</Button>
          <b-field>
            <b-upload v-model="dropFiles" multiple drag-drop>
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon icon="upload" size="is-large"> </b-icon>
                  </p>
                  <p>Arrastra el archivo de la foto aquí</p>
                </div>
              </section>
            </b-upload>
          </b-field>
          <Button>Generar Legajo</Button>
          <Button outlined>Descargar ANEXO 01</Button>
          <Button outlined>Descargar ANEXO 02</Button>
          <Button outlined>Descargar ANEXO 03</Button>
          <Button outlined>Descargar ANEXO 04</Button>
        </div>
      </section>
    </div>
  </Wrapper>
</template>

<script>
import Wrapper from "~/components/containers/Wrapper.vue";
import Information from "~/components/molecules/Information.vue";
import Button from "~/components/shared/Button.vue";
export default {
  layout: "documents",
  components: {
    Wrapper,
    Information,
    Button,
  },
  data: () => ({
    image:
      "https://industrial.unmsm.edu.pe/wp-content/uploads/2015/03/foto-carnet1.jpg",
  }),
};
</script>

<style lang="scss" scoped>
@import "assets/scss/_theme-default";
.worker-profile {
  padding: 5rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 10rem), 1fr));
  section {
    grid-column: span 2;
  }
}

.information-group {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
}

.information-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-left: 1rem;
}

.worker-actions {
  width: 100%;

  .worker-photo {
    width: 100%;
    display: flex;
    justify-content: center;
    picture {
      width: 60%;
    }
  }
}

.worker-actions-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
}
</style>