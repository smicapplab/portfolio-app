<script>
    export let dividerLabel = "";
</script>

<div class="relative">
    <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t"></span>
    </div>
    <div class="relative flex justify-center text-xs">
        <span class="px-2 bg-background text-muted-foreground">{dividerLabel}</span>
    </div>
</div>