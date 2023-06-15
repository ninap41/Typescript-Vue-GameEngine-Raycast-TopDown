<template>
	<h4 class="pb-1">Spells</h4>
	<div
		v-for="(spell, i) of spells.spells"
		class="flex text-xs flex-col text-black"
	>
		<!-- Button trigger modal -->
		<button
			class="badge bg-secondary"
			data-bs-toggle="modal"
			data-bs-target="#spellModal"
			@click="setChosenSpell(spell)"
		>
			{{ spell.name }} - {{ spell.level === 0 ? "Cantrip" : spell.level }}
		</button>

		<!-- Modal -->
	</div>
</template>

<script setup lang="ts">
defineProps<{
	spells: any
	setChosenSpell: any
}>()
</script>
