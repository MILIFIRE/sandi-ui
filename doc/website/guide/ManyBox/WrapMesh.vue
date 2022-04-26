<template>
    <SDMesh >
        <SDBoxGeometry :width="1" />
        <SDMeshBasicMaterial>
            <SDTextureLoader url="/img/crate.gif" type="map" />
        </SDMeshBasicMaterial>
    </SDMesh>
</template>