import json


def default(obj):
    if hasattr(obj, 'to_json'):
        return obj.to_json()
    raise TypeError(f'Object of type {obj.__class__.__name__} is not JSON serializable')


class Label:
    def __init__(self, label, x, y, width, height):
        self.label = label
        self.x = x
        self.y = y
        self.width = width
        self.height = height

    def __iter__(self):
        yield from {
            "label": self.label,
            "x": self.x,
            "y": self.y,
            "width": self.width,
            "height": self.height
        }.items()

    def __str__(self):
        return json.dumps(dict(self), ensure_ascii=False)

    def __repr__(self):
        return self.__str__()

    def to_json(self):
        return self.__str__()


class ImageLabelCollection:
    def __init__(self, bboxes):
        self.version = 1
        self.type = "bounding-box-labels"
        self.bboxes = bboxes

    def __iter__(self):
        yield from {
            "version": self.version,
            "type": self.type,
            "boundingBoxes": self.bboxes
        }.items()

    def __str__(self):
        return json.dumps(self.to_json())
        # return json.dumps(dict(self), default=default, ensure_ascii=False)

    def __repr__(self):
        return self.__str__()

    def to_json(self):
        to_return = {"version": self.version, "type": self.type}
        image_boxes = {}
        for key, boxes in self.bboxes.items():
            jboxes = []
            for box in boxes:
                jboxes.append(box.__dict__)
            image_boxes[key] = jboxes

        to_return["boundingBoxes"] = image_boxes
        return to_return

label1 = Label("person", 10, 10, 4, 10)
label2 = Label("car", 20, 20, 5, 11)

image_bboxes = {"image1.jpg": [label1, label2]}

image_label_col = ImageLabelCollection(image_bboxes)
print(image_label_col)
print(json.dumps(image_label_col, default=default))