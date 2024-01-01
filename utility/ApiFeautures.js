class apiFeatures {
    constructor(mongooseQuery, queryStr) {
        this.mongooseQuery = mongooseQuery
        this.queryStr = queryStr
    }

    paginate(docemuntCount) {
        const page = this.queryStr.page * 1 || 1
        const limit = this.queryStr.limit * 1 || 5
        const skip = (page - 1) * limit
        const endIndex = page * limit;

        const pagination = {};
        pagination.currentPage = page;
        pagination.limit = limit;
        pagination.numberOfPages = Math.ceil(docemuntCount / limit);

        // next page
        if (endIndex < docemuntCount) {
            pagination.next = page + 1;
        } else if (skip > 0) {
            pagination.prev = page - 1;
        }

        this.paginationResult = pagination;
        this.mongooseQuery.skip(skip).limit(limit);
        return this;

    }

    limitFields() {
        // // fields
        if (this.queryStr.field) {
            const fieldsStr = this.queryStr.field.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.select(fieldsStr);
        } else {
            this.mongooseQuery = this.mongooseQuery.select("-__v");
        }
        return this;
    }
    
    sort() {
        // sorting
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        } else {
            this.mongooseQuery = this.mongooseQuery.sort("createdAt");
        }
        return this;
    }

    fielter() {
        // 1) fieltring
        const queryStringObjc = { ...this.queryStr };
        const execludFields = ["page", "limit", "sort", "field"];
        execludFields.forEach((val) => delete queryStringObjc[val]);

        // Apply filteration using [gte,gt,lte,lt]
        let quertStr = JSON.stringify(queryStringObjc);

        quertStr = JSON.parse(
            quertStr.replace(/\b(gte|gt|lte|lt)\b/g, (val) => `$${val}`)
        );

        if (this.queryStr.keyword) {
            // searching
            this.mongooseQuery = this.mongooseQuery.find({
                $or: [
                    { title: { $regex: this.queryStr.keyword, $options: "i" } }, // 'i' for case-insensitive
                    { description: { $regex: this.queryStr.keyword, $options: "i" } },
                    { name: { $regex: this.queryStr.keyword, $options: "i" } },
                ],
            });
        } else {
            // get products
            this.mongooseQuery = this.mongooseQuery.find(quertStr);
        }
        return this;
    }
}
module.exports = apiFeatures;
