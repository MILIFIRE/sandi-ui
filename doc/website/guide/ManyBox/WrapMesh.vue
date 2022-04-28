<template>
    <SDMesh>
        <SDBoxGeometry :width="1" />
        <SDMeshBasicMaterial>
            <SDTextureLoader :url="$withBase('/img/crate.gif')" type="map" />
        </SDMeshBasicMaterial>
    </SDMesh>
</template>