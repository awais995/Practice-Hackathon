import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// 

export const getProducts = async () => {
  try {
      const query = `*[_type == "product"]{
          _id,
          name,
          "imageUrl": image.asset->url,
          price,
          discountPercentage,
          tags
      }`;
      return await client.fetch(query);
  } catch (error) {
      console.error('Error fetching products:', error);
      throw error; // Rethrow to debug further
  }
};