export const demoTasks = [{
    "_id": "35f7907d-26c9-4233-8e38-a4fa3813166c",
    "date": "2023-07-22",
    "amount": 5,
    "notes": "Don Quixote, chapters 48-52",
    "taskType": {
        "_ref": "e793bb6f-4f73-47d0-99d6-2055f61d9786",
        "_type": "reference"
    },
    "user": {
        "_id": "64ba15d000028f23bfd12a61"
    }
},
{
    "user": {
        "_id": "64ba15d000028f23bfd12a61"
    },
    "_id": "6943482a-be46-4cee-a8ee-8f617e1b5902",
    "date": "2023-07-22",
    "amount": 2,
    "notes": "Practice 2 x Requiem in D Minor",
    "taskType": {
        "_ref": "0899f634-e948-44f2-9f0b-7f0f68569623",
        "_type": "reference"
    }
},
{
    "amount": 2,
    "notes": "Cleaning out the garage",
    "taskType": {
        "_type": "reference",
        "_ref": "58a772c8-9b82-49f4-8e74-8f264943be77"
    },
    "user": {
        "_id": "64ba15d000028f23bfd12a61"
    },
    "_id": "754c740e-24e3-439f-9fa6-7aa2863cc5e7",
    "date": "2023-07-22"
},
{
    "_id": "7e1cb61c-5236-45ee-a82d-33ff3f670d3d",
    "date": "2023-07-22",
    "amount": 1,
    "notes": "Jogging",
    "taskType": {
        "_type": "reference",
        "_ref": "ae5e7748-430d-4418-9fec-a8fb8a5d1b64"
    },
    "user": {
        "_id": "64ba15d000028f23bfd12a61"
    }
},
{
    "_id": "947b6c8e-6b21-4f6b-914e-6c6339f76b4f",
    "date": "2023-07-22",
    "amount": 1,
    "notes": "Thinning out and planting sprouts",
    "taskType": {
        "_ref": "e73bc558-89c6-4dcf-8f6b-69a45527ec01",
        "_type": "reference"
    },
    "user": {
        "_id": "64ba15d000028f23bfd12a61"
    }
},
{
    "_id": "a0c859d2-edae-4066-8b80-c855caf350f9",
    "date": "2023-07-22",
    "amount": 3,
    "notes": "Practice 3 x Eine Kleine Nachtmusik",
    "taskType": {
        "_ref": "0899f634-e948-44f2-9f0b-7f0f68569623",
        "_type": "reference"
    },
    "user": {
        "_id": "64ba15d000028f23bfd12a61"
    }
}
];

export const demoTaskTypes = [{
    "user": {
        "_id": "64ba15d000028f23bfd12a61"
    },
    "_id": "ae5e7748-430d-4418-9fec-a8fb8a5d1b64",
    "_type": "taskType",
    "unit": "Hours",
    "name": "Cardio",
    "category": {
        "_ref": "fd7fc6b7-c28c-490e-a87a-075d4235abbb",
        "_type": "reference"
    },
    "icon": {
        "_ref": "d901848f-d8cc-4edd-8753-b05bb6f3d34c",
        "_type": "reference"
    }
},
{
    "icon": {
        "_ref": "e0ab99ac-2ced-498b-913b-958a8c1a2310",
        "_type": "reference"
    },
    "user": {
        "_id": "64ba15d000028f23bfd12a61"
    },
    "_id": "58a772c8-9b82-49f4-8e74-8f264943be77",
    "_type": "taskType",
    "unit": "Hours",
    "name": "Cleaning",
    "category": {
        "_ref": "f988194a-42a6-428a-acd7-52efaf1af80a",
        "_type": "reference"
    }
}, {
    "user": {
        "_id": "64ba15d000028f23bfd12a61"
    },
    "_id": "e73bc558-89c6-4dcf-8f6b-69a45527ec01",
    "_type": "taskType",
    "unit": "Hours",
    "name": "Gardening",
    "category": {
        "_ref": "a7c8ea05-19f7-441b-8483-668634f847c1",
        "_type": "reference"
    },
    "icon": {
        "_ref": "7ba1875e-474d-40e6-b0aa-195cf6dbd9f7",
        "_type": "reference"
    }
}, {
    "user": {
        "_id": "64ba15d000028f23bfd12a61"
    },
    "_id": "0899f634-e948-44f2-9f0b-7f0f68569623",
    "_type": "taskType",
    "unit": "Songs",
    "name": "Play Guitar",
    "category": {
        "_ref": "6ca145c9-154a-465e-bc16-6fa5741373e7",
        "_type": "reference"
    },
    "icon": {
        "_ref": "052d5d51-e243-4057-95e6-215b4cd2252d",
        "_type": "reference"
    }
}, {
    "_id": "e793bb6f-4f73-47d0-99d6-2055f61d9786",
    "_type": "taskType",
    "unit": "Chapters",
    "name": "Reading",
    "category": {
        "_type": "reference",
        "_ref": "f5a8c20a-ceb2-4a67-9a59-537e7dbd31c7"
    },
    "icon": {
        "_ref": "46b56346-290d-41bb-b7de-785f7c8a2c00",
        "_type": "reference"
    },
    "user": {
        "_id": "64ba15d000028f23bfd12a61"
    }
}
];

export const demoCategories = [{
    "name": "Gardening",
    "icon": {
        "_type": "reference",
        "_ref": "7ba1875e-474d-40e6-b0aa-195cf6dbd9f7"
    },
    "user": {
        "_id": "64ba15d000028f23bfd12a61"
    },
    "_id": "a7c8ea05-19f7-441b-8483-668634f847c1",
    "_type": "category",
    "color": {
        "_type": "color",
        "hex": "#5bd937"
    }
}];

export const demoSystemCategories = [{
    "_id": "6ca145c9-154a-465e-bc16-6fa5741373e7",
    "_type": "category",
    "color": {
        "hex": "#8200a9",
        "hsv": {
            "h": 286.0658578856153,
            "a": 1,
            "s": 1,
            "v": 0.6625,
            "_type": "hsvaColor"
        },
        "rgb": {
            "a": 1,
            "b": 169,
            "r": 130,
            "g": 0,
            "_type": "rgbaColor"
        },
        "hsl": {
            "l": 0.33125,
            "a": 1,
            "s": 1,
            "_type": "hslaColor",
            "h": 286.0658578856153
        },
        "alpha": 1,
        "_type": "color"
    },
    "name": "Art",
    "icon": {
        "_ref": "3b59f3f4-246b-47bb-9140-b01a56e71822",
        "_type": "reference"
    },
    "user": {
        "_id": "6a9fafc8-7b35-4fea-a872-f4690330df26"
    }
}, {
    "_id": "f988194a-42a6-428a-acd7-52efaf1af80a",
    "_type": "category",
    "color": {
        "alpha": 1,
        "_type": "color",
        "hex": "#d9b406",
        "hsv": {
            "a": 1,
            "s": 0.9731000000000001,
            "v": 0.85,
            "_type": "hsvaColor",
            "h": 49.601386481802436
        },
        "rgb": {
            "b": 6,
            "r": 217,
            "g": 180,
            "_type": "rgbaColor",
            "a": 1
        },
        "hsl": {
            "h": 49.601386481802436,
            "l": 0.43643249999999995,
            "a": 1,
            "s": 0.9476093095725,
            "_type": "hslaColor"
        }
    },
    "name": "Cleaning",
    "icon": {
        "_ref": "e0ab99ac-2ced-498b-913b-958a8c1a2310",
        "_type": "reference"
    },
    "user": {
        "_id": "6a9fafc8-7b35-4fea-a872-f4690330df26"
    }
}, {
    "user": {
        "_id": "6a9fafc8-7b35-4fea-a872-f4690330df26"
    },
    "_id": "21558ca3-f691-4ec4-8123-b496a585b87e",
    "_type": "category",
    "color": {
        "hsv": {
            "a": 1,
            "s": 0.8431000000000001,
            "v": 0.75,
            "_type": "hsvaColor",
            "h": 85.78856152512996
        },
        "rgb": {
            "b": 30,
            "r": 122,
            "g": 191,
            "_type": "rgbaColor",
            "a": 1
        },
        "hsl": {
            "a": 1,
            "s": 0.7287578874578616,
            "_type": "hslaColor",
            "h": 85.78856152512996,
            "l": 0.4338375
        },
        "alpha": 1,
        "_type": "color",
        "hex": "#7abf1e"
    },
    "name": "Commute",
    "icon": {
        "_ref": "8cc77f23-a6bc-48b4-a3f9-83eb0d52902a",
        "_type": "reference"
    }
}, {
    "icon": {
        "_ref": "d901848f-d8cc-4edd-8753-b05bb6f3d34c",
        "_type": "reference"
    },
    "user": {
        "_id": "6a9fafc8-7b35-4fea-a872-f4690330df26"
    },
    "_id": "fd7fc6b7-c28c-490e-a87a-075d4235abbb",
    "_type": "category",
    "color": {
        "hsl": {
            "s": 0.7262213015708614,
            "_type": "hslaColor",
            "h": 163.7781629116118,
            "l": 0.47068125,
            "a": 1
        },
        "alpha": 1,
        "_type": "color",
        "hex": "#21cfa0",
        "hsv": {
            "v": 0.8125,
            "_type": "hsvaColor",
            "h": 163.7781629116118,
            "a": 1,
            "s": 0.8414
        },
        "rgb": {
            "_type": "rgbaColor",
            "a": 1,
            "b": 160,
            "r": 33,
            "g": 207
        }
    },
    "name": "Exercise"
}, {
    "color": {
        "_type": "color",
        "hex": "#184db6",
        "hsv": {
            "a": 1,
            "s": 0.8656,
            "v": 0.7125,
            "_type": "hsvaColor",
            "h": 219.93067590987866
        },
        "rgb": {
            "g": 77,
            "_type": "rgbaColor",
            "a": 1,
            "b": 182,
            "r": 24
        },
        "hsl": {
            "l": 0.40413,
            "a": 1,
            "s": 0.7630465444287731,
            "_type": "hslaColor",
            "h": 219.93067590987866
        },
        "alpha": 1
    },
    "name": "Reading",
    "icon": {
        "_ref": "46b56346-290d-41bb-b7de-785f7c8a2c00",
        "_type": "reference"
    },
    "user": {
        "_id": "6a9fafc8-7b35-4fea-a872-f4690330df26"
    },
    "_id": "f5a8c20a-ceb2-4a67-9a59-537e7dbd31c7",
    "_type": "category"
}, {
    "_id": "4c0a04a0-e1f3-4860-a459-3e96217a69a7",
    "_type": "category",
    "color": {
        "hsv": {
            "_type": "hsvaColor",
            "h": 17.157712305025985,
            "a": 1,
            "s": 0.9246,
            "v": 1
        },
        "rgb": {
            "a": 1,
            "b": 19,
            "r": 255,
            "g": 87,
            "_type": "rgbaColor"
        },
        "hsl": {
            "a": 1,
            "s": 1,
            "_type": "hslaColor",
            "h": 17.157712305025985,
            "l": 0.5377000000000001
        },
        "alpha": 1,
        "_type": "color",
        "hex": "#ff5713"
    },
    "name": "Shopping",
    "icon": {
        "_ref": "1dfc7d04-2a6e-45fb-9afd-91ba5e8edad1",
        "_type": "reference"
    },
    "user": {
        "_id": "6a9fafc8-7b35-4fea-a872-f4690330df26"
    }
}];

export const demoIcons = [{
    "_rev": "E1XsAw9jgMpXJE9gS379at",
    "_type": "iconImage",
    "name": "music",
    "_id": "04baac9e-4510-46bc-ae07-3ec5ba9e62b4",
    "_updatedAt": "2023-04-28T10:53:45Z",
    "image": {
        "_type": "image",
        "asset": {
            "_ref": "image-5119a21b8b9f1c58593f3c36ad32983fa1cdecde-32x32-png",
            "_type": "reference"
        }
    },
    "_createdAt": "2023-04-28T10:53:45Z"
}, {
    "_type": "iconImage",
    "name": "guitar",
    "_id": "052d5d51-e243-4057-95e6-215b4cd2252d",
    "_updatedAt": "2023-05-01T03:48:45Z",
    "image": {
        "_type": "image",
        "asset": {
            "_ref": "image-37433b9ed1e3d7a50fe8374a6a7e8b5fa4349eba-32x32-png",
            "_type": "reference"
        }
    },
    "_createdAt": "2023-05-01T03:31:07Z",
    "_rev": "E1XsAw9jgMpXJE9gSZQKXD"
}, {
    "image": {
        "_type": "image",
        "asset": {
            "_ref": "image-8fadd33c22ff34d6703e7cc47d6b9158cb4d6fb9-32x32-png",
            "_type": "reference"
        }
    },
    "_createdAt": "2023-04-28T10:44:32Z",
    "_rev": "G5Y8dp3qMJshGOmtvnZ5Sl",
    "_type": "iconImage",
    "name": "books",
    "_id": "46b56346-290d-41bb-b7de-785f7c8a2c00",
    "_updatedAt": "2023-04-28T10:44:32Z"
}, {
    "_type": "iconImage",
    "name": "running",
    "_id": "d901848f-d8cc-4edd-8753-b05bb6f3d34c",
    "_updatedAt": "2023-04-28T11:00:18Z",
    "image": {
        "_type": "image",
        "asset": {
            "_ref": "image-111313fcb827a3ffbfae9b91df6c483f4ef02c7a-32x32-png",
            "_type": "reference"
        }
    },
    "_createdAt": "2023-04-28T11:00:18Z",
    "_rev": "G5Y8dp3qMJshGOmtvnqnUB"
}, {
    "name": "broom",
    "_id": "e0ab99ac-2ced-498b-913b-958a8c1a2310",
    "_updatedAt": "2023-04-28T10:45:30Z",
    "image": {
        "_type": "image",
        "asset": {
            "_ref": "image-b277d6218a2d197b79c526128263d76191a7dad7-32x32-png",
            "_type": "reference"
        }
    },
    "_createdAt": "2023-04-28T10:44:37Z",
    "_rev": "E1XsAw9jgMpXJE9gS2wct9",
    "_type": "iconImage"
}, {
    "image": {
        "_type": "image",
        "asset": {
            "_ref": "image-2c88ee8694280c404dc3f387612d1f43b1116b23-32x32-png",
            "_type": "reference"
        }
    },
    "_createdAt": "2023-04-28T10:48:36Z",
    "_rev": "G5Y8dp3qMJshGOmtvngod9",
    "_type": "iconImage",
    "name": "flower",
    "_id": "7ba1875e-474d-40e6-b0aa-195cf6dbd9f7",
    "_updatedAt": "2023-04-28T10:48:36Z"
}];