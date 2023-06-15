<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from "vue"

const props = defineProps<{
	spell: any
}>()

onBeforeMount(() => {
	console.log(props.spell)
})
</script>

<template>
	<div
		v-if="spell"
		class="modal fade text-xs text"
		data-bs-backdrop="static"
		id="spellModal"
		tabindex="-1"
		aria-labelledby="exampleModalLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog" data-bs-backdrop="static">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title badge bg-secondary" style="font-size: 20px">
						{{ spell.name }}
					</h5>

					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
					>
						X
					</button>
				</div>
				<div class="modal-body">
					<div class="card p-1 container bg-gray-200 flex flex-row">
						<div class="basis-1/3">
							<p><b>Range</b>:{{ spell.range }}</p>
							<p>
								<b>Components</b>:
								<span v-for="(component, i) of spell.components">{{
									i === spell.components.length - 1 ? component : component + ", "
								}}</span>
							</p>
							<p><b>Ritual</b>: {{ spell.ritual }}</p>
						</div>
						<div class="basis-1/3">
							<p><b>Duration</b>: {{ spell.duration }}</p>
							<p><b>Concentration</b>: {{ spell.concentration }}</p>
							<p><b>Casting Time</b>: {{ spell.casting_time }}</p>
						</div>
						<div class="basis-1/3">
							<p><b>Level</b>: {{ spell.level }}</p>
							<p><b>School</b>: {{ spell.school.name }}</p>
						</div>
					</div>
					<p class="description p-1">
						<b
							><p v-for="line of spell.desc">{{ line }}</p>
							&nbsp;</b
						>
					</p>

					<p>
						<b>Classes</b>:
						<span v-for="(class_, i) of spell.classes"
							><RouterLink
								:to="{ name: 'classes', params: { class: class_.name.toLowerCase() } }"
								>{{
									i === spell.classes.length - 1 ? class_.name : class_.name + ", "
								}}</RouterLink
							></span
						>
						&nbsp; <b>Subclasses</b>: <span>{{ spell.subclasses }}</span> <b>url</b>:
						<span>{{ spell.url }}</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.description p {
	text-indent: 1rem;
}
</style>
