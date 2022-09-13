onEvent("recipes", event => {
  event.shaped(CABF("obsidian_machine"), [
		"SSS",
		"SCS",
		"SSS"
	], {
		C: CR("railway_casing"),
		S: CABF("sturdy_mechanism")
	})

	let transitional = asIdentifier("incomplete_sturdy_mechanism")
	event.recipes.createSequencedAssembly([
		asIdentifier("sturdy_mechanism"),
	], "create:precision_mechanism", [
		event.recipes.createDeploying(transitional, [transitional, CR("sturdy_sheet")]),
		event.recipes.createDeploying(transitional, [transitional, CR("sturdy_sheet")]),
		event.recipes.createPressing(transitional, transitional)
	]).transitionalItem(transitional)
		.loops(1)
		.id(asIdentifier("sturdy_mechanism"))

	let obsidian_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), asIdentifier("obsidian_machine"), other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: asIdentifier("obsidian_machine"), B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), asIdentifier("obsidian_machine"))
	}
	obsidian_machine(CR("track_station"), 1, MC("compass"))
	obsidian_machine(CR("track_signal"), 1, CR("electron_tube"))
	obsidian_machine(CR("track_observer"), 1, MC("observer"))
	obsidian_machine(CR("controls"), 1, MC("lever"))
})