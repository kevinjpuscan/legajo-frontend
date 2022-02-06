<template>
  <Wrapper>
    <div class="worker-profile">
      <section class="worker-information">
        <div class="information-group">
          <div>
            <h1>Información Personal</h1>
          </div>

          <div class="information-list">
            <Information
              label="Apellidos:"
              :value="this.$store.state.worker.worker.last_names"
            />
            <Information
              label="Nombres:"
              :value="this.$store.state.worker.worker.first_names"
            />
            <Information
              label="Fecha de Nacimiento:"
              :value="this.$store.state.worker.worker.birth_date | formatDate"
            />
            <Information
              label="DNI:"
              :value="this.$store.state.worker.worker.identification_number"
            />
            <Information
              label="RUC:"
              :value="this.$store.state.worker.worker.ruc"
            />
            <Information
              label="Sexo:"
              :value="this.$store.state.worker.worker.sex"
            />
          </div>
        </div>
        <div class="information-group">
          <div>
            <h1>Información Laboral</h1>
          </div>

          <div class="information-list">
            <Information
              label="Unidad Organizacional:"
              :value="
                this.$store.state.worker.worker.job_position &&
                this.$store.state.worker.worker.job_position.organizational_unit
                  .name
              "
            />
            <Information
              label="Puesto Laboral:"
              :value="
                this.$store.state.worker.worker.job_position &&
                this.$store.state.worker.worker.job_position.title
              "
            />
          </div>
        </div>
      </section>
      <section class="worker-actions">
        <div class="worker-photo">
          <picture>
            <b-image
              :src="
                this.$store.state.worker.worker.photo &&
                this.$store.state.worker.worker.photo.url | fileUrl
              "
              alt="The Buefy Logo"
              ratio="1by1"
              :rounded="true"
            ></b-image>
          </picture>
        </div>
        <div class="worker-actions-list">
          <Button :disabled="!isSaveImageActive" @click="saveImage"
            >Cambiar Photo</Button
          >
          <div v-if="imageFile" class="tags">
            <span class="tag is-primary">
              {{ imageFile.name }}
              <button
                class="delete is-small"
                type="button"
                @click="deleteDropFile()"
              ></button>
            </span>
          </div>
          <b-field>
            <b-upload v-model="imageFile" drag-drop>
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

          <a
            class="button is-primary is-outlined"
            :href="
              `/workers/report/1/${this.$store.state.worker.worker.id}`
                | fileUrl
            "
            target="_blank"
          >
            Descargar ANEXO 1</a
          >
          <a
            class="button is-primary is-outlined"
            :href="
              `/workers/report/2/${this.$store.state.worker.worker.id}`
                | fileUrl
            "
            target="_blank"
            >Descargar ANEXO 2</a
          >
          <a
            class="button is-primary is-outlined"
            :href="
              `/workers/report/3/${this.$store.state.worker.worker.id}`
                | fileUrl
            "
            target="_blank"
            >Descargar ANEXO 3</a
          >
          <a
            class="button is-primary is-outlined"
            :href="
              `/workers/report/4/${this.$store.state.worker.worker.id}`
                | fileUrl
            "
            target="_blank"
            >Descargar ANEXO 4</a
          >
        </div>
      </section>
    </div>
  </Wrapper>
</template>

<script>
import Wrapper from '~/components/containers/Wrapper.vue'
import Information from '~/components/molecules/Information.vue'
import Button from '~/components/shared/Button.vue'
import CONFIG from '~/config/index'

export default {
  layout: 'documents',
  components: {
    Wrapper,
    Information,
    Button,
  },
  filters: {
    fileUrl(url) {
      return url
        ? `${CONFIG.strapiUrl}${url}`
        : 'https://industrial.unmsm.edu.pe/wp-content/uploads/2015/03/foto-carnet1.jpg'
    },
  },

  data: () => ({
    imageFile: null,
  }),
  computed: {
    isSaveImageActive() {
      return !!this.imageFile
    },
  },
  methods: {
    async saveImage() {
      const { worker } = this.$route.params
      const image = await this.$repository.upload.create([this.imageFile])
      await this.$repository.worker.update(worker, {
        photo: image[0].id,
      })
      this.imageFile = null
      await this.$store.dispatch('worker/fetchWorker', worker)
    },
    deleteDropFile() {
      this.imageFile = null
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/scss/_theme-default';
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
