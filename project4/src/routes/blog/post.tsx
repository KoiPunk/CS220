import { useRoute } from 'preact-iso';

export default function Post() {
	
	return (
		<p>Slug is {useRoute().params.id}</p>
	)
}