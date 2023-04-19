import { createClient } from "@sanity/client";
import  imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: "",
    dataset: 'production',
    useCdn: true,
    apiVersion: '2021-10-21',
});

const builder = imageUrlBuilder(client);

export function urlFor(source){
    return builder.image(source);
}