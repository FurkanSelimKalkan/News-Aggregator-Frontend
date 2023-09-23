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
    <div class="header">
      <h1>News</h1>
    </div>
    <div class="body">
      <div v-for="article in articles" :key="article.title" class="article">
        <h2 class="article-title">{{ article.title }}</h2>
        <p class="article-description">{{ article.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add scoped attribute to ensure the styles only apply to this component */

.wrapper {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.header {
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  text-align: center;
  border-radius: 5px 5px 0 0;
}

.header h1 {
  margin: 0;
  font-size: 24px;
}

.body {
  padding: 20px;
}

.article {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.article-title {
  color: gray;
  font-size: 20px;
  margin: 0;
}

.article-description {
  color: #333;
  margin-top: 5px;
}
</style>

