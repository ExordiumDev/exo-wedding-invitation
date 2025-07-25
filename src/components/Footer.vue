<template>
    <div class="d-flex flex-column bg-ligthCustom elevation-18" >
        <div class="px-4 py-5 text-left w-100">
            <div class="d-flex justify-space-between">
                <div>
                    {{ new Date().getFullYear() }} — <strong>Nice Dream</strong>
                </div>
                <div class="d-flex flex-row">
                    <p class="text-muted mr-2">Copyright &copy; 2025 <a :href="$appInfo.baseURL">{{$appInfo.appName}}</a></p>
                    <b>Version</b> {{$appInfo.appVersion}}
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>

export default {
    name: 'Footer',
}

</script>