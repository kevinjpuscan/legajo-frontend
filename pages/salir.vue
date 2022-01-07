<script>
export default {
  name: "Salir",
  mounted() {
    this.$repository.security.logout();
    window.location.href = "/";
  },
};
</script>