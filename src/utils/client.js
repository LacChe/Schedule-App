import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-04-20',
  token: process.env.REACT_APP_SANITY_SECRET_TOKEN 
})

const builder = imageUrlBuilder(client);
export const urlFor = (source) => {
  if(!source) {
    console.log('Image Builder ERROR, no source')
    return '';
  }
  return builder.image(source);
}