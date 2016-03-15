# vu_socialweb_2016
Project for The Social Web Course, at Vrije University Amsterdam

[view the dashboard](https://cdn.rawgit.com/knanne/vu_socialweb_2016/master/dashboard/index.html) using [rawgit](http://rawgit.com/)

##Description
[The Network Institute](http://www.networkinstitute.org/) is a center of multidisciplinary research with a diverse range of members and projects. These members often have independent websites documenting their own interests and work. Being able to make research connections is therefore difficult.

We explore the complex connections between researchers of The Network Institute, and create a tool for starting future collaborations. The data used in our visualizations has been obtained through the public Twitter API and through scraping individual web pages.

###D3 Force Directed Graph Network
This network graph shows mutual friendships between Twitter accounts affiliated with the network institute. In order to include relevant connections, only the friends that follow at least two Network Institute accounts are included. The accounts shown were scraped from the individual network insitute websites. Each account is colored by its Network Institude group affiliation.

###D3 Website Similarity Matrix
This matrix shows the similarity between the individual pages of Network Institute members. To reduce the size of the matrix, only those pages with more than 4000 chracters of text were included. Each page is labeled by the owning member, and is colored by its Network Institude group affiliation. The specific calculation used in a cosine similirity computed on tf-idf vectors for each website's body text.

