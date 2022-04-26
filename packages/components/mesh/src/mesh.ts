import { getCore } from "@sandi-ui/utils"

import { Group, Mesh, Object3D, Material, BufferGeometry, BoxGeometry, MeshBasicMaterial, CircleGeometry, ConeGeometry, SphereGeometry, PlaneGeometry } from "three"
import { EventType } from '@sandi-ui/enum';
const useMesh = (geometry?: BufferGeometry | undefined, material?: Material, geometryType?: string, geometryParam: any = {}) => {
    const core = getCore()
    let updateCallback;
    if (!geometry && !geometryType) {
        geometry = new BoxGeometry(1, 1, 1);
    }
    if (!material) {
        material = new MeshBasicMaterial({ color: 0x00ff00 });
    }
    let instance = new Mesh(geometry, material)
    const { parentId, id } = core.addNode(instance);
    const changGeometry = (geometry: BufferGeometry) => {
        if (parentId) {
            const { node: parent } = core.getNode(parentId)
            const { material, children, position: p, rotation: r, scale: s } = instance as Mesh;
            parent?.remove(instance);
            instance = new Mesh(geometry, material) as Mesh<BufferGeometry, Material>
            instance.position.set(p.x, p.y, p.z);
            instance.rotation.set(r.x, r.y, r.z);
            instance.scale.set(s.x, s.y, s.z);
            parent?.add(instance)
            children.forEach(object3D => {
                instance.add(object3D)
            })
            core.setNode(id, instance)
        }

    }
    const ChangMaterial = (material: Material) => {
        instance.material = material
    }

    core.addEventListenerById(id, EventType.ChangMaterial, (Event) => {
        const { material } = Event;
        ChangMaterial(material)
    })
    core.addEventListenerById(id, EventType.ChangGeometry, (Event) => {
        const { geometry } = Event;
        changGeometry(geometry)
        updateCallback(instance)
    })
    core.addEventListenerById(id, EventType.AddObject3d, (Event) => {
        const { object3d } = Event;
        instance.add(object3d)
    })

    if (parentId) {
        core.dispatchEventById(parentId, { type: EventType.AddObject3d, object3d: instance })
    }
    // mesh 需要获取子集的 几何体 和材质
    const getInstance = () => {
        return instance
    }

    const update = (fn: (instance: Mesh<BufferGeometry, Material>) => void) => {
        updateCallback = fn
    }
    return { getInstance, update }
}

// 物体
export default useMesh;