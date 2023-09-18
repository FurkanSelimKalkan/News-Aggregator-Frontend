<script setup>
import { ref, onMounted} from "vue";
import apiService from "@/apiClient/apiService";

const articles = ref([])

onMounted(async () => {
  const response = await apiService.getNews()
      .then(response => {
        articles.value =  response.data.articles
  })
})
</script>

<template>
<div class="wrapper">
  <div class="header"><h1>News</h1></div>
  <div class="body">
    <div v-for="article in articles" :key="article.title">
      <h2>{{ article.title }}</h2>
      <p>{{ article.description }}</p>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>
