<template>
    <SDMesh>
        <SDBoxGeometry :width="1" />
        <SDMeshBasicMaterial>
            <SDTextureLoader url="/sandi-ui/img/crate.gif" type="map" />
        </SDMeshBasicMaterial>
    </SDMesh>
</template>