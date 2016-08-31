import {expect} from 'chai';

import {parse} from '../lib/Template/TemplateParser';

describe('Template parser', function () {
    var primitives = [12, 1.2, -1, -1.2, true, false, undefined, null],
        paths = ['abc', 'abc.test', '@abc.test'];

    it('parse strings', function () {
        expect(parse('hello')).to.eql([
            {
                type: 'Text',
                content: 'hello'
            }
        ]);
    });

    it('parse variables', function () {
        expect(parse('{{test}}')).to.eql([
            {
                type: 'Expression',
                path: 'test',
                params: null,
                hash: null
            }
        ]);
    });

    describe('helpers', function () {
        describe('params', function () {

            primitives.forEach((param) => {
                it('primitive param ' + param, function () {
                    expect(parse(`{{test ${String(param)}}}`)).to.eql([
                        {
                            type: 'Expression',
                            path: 'test',
                            params: [
                                {
                                    type: 'Primitive',
                                    value: param
                                }
                            ],
                            hash: null
                        }
                    ]);
                });
            });

            it('string', function () {
                expect(parse(`{{test "test"}}`)).to.eql([
                    {
                        type: 'Expression',
                        path: 'test',
                        params: [['test']],
                        hash: null
                    }
                ]);
            });

            paths.forEach((param) => {
                it('var param ' + param, function () {
                    expect(parse(`{{test ${param}}}`)).to.eql([
                        {
                            type: 'Expression',
                            path: 'test',
                            params: [
                                {
                                    type: 'Path',
                                    path: param
                                }
                            ],
                            hash: null
                        }
                    ]);
                });
            });

            it('several params', function () {
                expect(parse('{{test true abc}}')).to.eql([
                    {
                        type: 'Expression',
                        path: 'test',
                        params: [
                            {
                                type: 'Primitive',
                                value: true
                            },
                            {
                                type: 'Path',
                                path: 'abc'
                            }
                        ],
                        hash: null
                    }
                ]);
            });

            describe('nesting', function () {
                it('param', function () {
                    expect(parse('{{test (test (test))}}')).to.eql([
                        {
                            type: 'Expression',
                            path: 'test',
                            params: [{
                                type: 'Expression',
                                path: 'test',
                                params: [{
                                    type: 'Expression',
                                    path: 'test',
                                    params: null,
                                    hash: null
                                }],
                                hash: null
                            }],
                            hash: null
                        }
                    ]);
                });
                it('several', function () {
                    expect(parse('{{test (test) (test)}}')).to.eql([
                        {
                            type: 'Expression',
                            path: 'test',
                            params: [{
                                type: 'Expression',
                                path: 'test',
                                params: null,
                                hash: null
                            }, {
                                type: 'Expression',
                                path: 'test',
                                params: null,
                                hash: null
                            }],
                            hash: null
                        }
                    ]);
                });
            });
        });

        describe('hash params', function () {
            primitives.forEach(param => {
                it('primitive ' + String(param), function () {
                    expect(parse(`{{test v1=${String(param)}}}`)).to.eql([
                        {
                            type: 'Expression',
                            path: 'test',
                            params: null,
                            hash: [
                                {
                                    name: 'v1',
                                    value: {
                                        type: 'Primitive',
                                        value: param
                                    }

                                }
                            ]
                        }
                    ]);
                });
            });

            it('string', function () {
                expect(parse(`{{test v1="test"}}`)).to.eql([
                    {
                        type: 'Expression',
                        path: 'test',
                        params: null,
                        hash: [{
                            name: 'v1',
                            value: ['test']
                        }]
                    }
                ]);
            });

            paths.forEach((param) => {
                it('var param ' + param, function () {
                    expect(parse(`{{test v1=${param}}}`)).to.eql([
                        {
                            type: 'Expression',
                            path: 'test',
                            params: null,
                            hash: [{
                                name: 'v1',
                                value: {
                                    type: 'Path',
                                    path: param
                                }
                            }]
                        }
                    ]);
                });
            });

            it('several params', function () {
                expect(parse('{{test v1=true v2=abc}}')).to.eql([
                    {
                        type: 'Expression',
                        path: 'test',
                        params: null,
                        hash: [{
                            name: 'v1',
                            value: {
                                type: 'Primitive',
                                value: true
                            }
                        }, {
                            name: 'v2',
                            value: {
                                type: 'Path',
                                path: 'abc'
                            }
                        }]
                    }
                ]);
            });

            describe('nesting', function () {
                it('param', function () {
                    expect(parse('{{test v1=(test (test))}}')).to.eql([
                        {
                            type: 'Expression',
                            path: 'test',
                            params: null,
                            hash: [{
                                name: 'v1',
                                value: {
                                    type: 'Expression',
                                    path: 'test',
                                    params: [{
                                        type: 'Expression',
                                        path: 'test',
                                        params: null,
                                        hash: null
                                    }],
                                    hash: null
                                }
                            }]
                        }
                    ]);
                });
                it('several', function () {
                    expect(parse('{{test v1=(test) v2=(test)}}')).to.eql([
                        {
                            type: 'Expression',
                            path: 'test',
                            params: null,
                            hash: [{
                                name: 'v1',
                                value: {
                                    type: 'Expression',
                                    path: 'test',
                                    params: null,
                                    hash: null
                                }
                            }, {
                                name: 'v2',
                                value: {
                                    type: 'Expression',
                                    path: 'test',
                                    params: null,
                                    hash: null
                                }
                            }]
                        }
                    ]);
                });
            })
        });

        describe('block helpers', function () {
            it('parse content', function () {
                expect(parse('{{#test}}test{{/test}}')).to.eql([{
                    type: 'BlockExpression',
                    path: 'test',
                    params: null,
                    hash: null,
                    content: [{
                        type: 'Text',
                        content: 'test'
                    }],
                    inverse: null
                }]);
            });
            it('parse inverse', function () {
                expect(parse('{{#test}}test{{else}}test2{{/test}}')).to.eql([{
                    type: 'BlockExpression',
                    path: 'test',
                    params: null,
                    hash: null,
                    content: [{
                        type: 'Text',
                        content: 'test'
                    }],
                    inverse: [{
                        type: 'Text',
                        content: 'test2'
                    }]
                }]);
            });
        });
    });

    describe('components', function () {
        it('tag without params', function () {
            expect(parse('<div></div>')).to.eql([
                {
                    type: 'Component',
                    attributes: null,
                    content: [],
                    name: 'div'
                }
            ]);
        });
        it('self closing tag without params', function () {
            expect(parse('<div/>')).to.eql([
                {
                    type: 'Component',
                    attributes: null,
                    name: 'div'
                }
            ]);
        });
        it('tag with attributes', function () {
            expect(parse('<div id="test"></div>')).to.eql([
                {
                    type: 'Component',
                    attributes: [
                        {
                            name: 'id',
                            value: ['test']
                        }
                    ],
                    content: [],
                    name: 'div'
                }
            ]);
        });
        it('self closing tag without params', function () {
            expect(parse('<div id="test"/>')).to.eql([
                {
                    type: 'Component',
                    attributes: [
                        {
                            name: 'id',
                            value: ['test']
                        }
                    ],
                    name: 'div'
                }
            ]);
        });
        it('tag with attribute variable', function () {
            expect(parse('<div id=test></div>')).to.eql([
                {
                    type: 'Component',
                    attributes: [
                        {
                            name: 'id',
                            value: {
                                type: 'Path',
                                path: 'test'
                            }
                        }
                    ],
                    content: [],
                    name: 'div'
                }
            ]);
        });
        it('tag with attribute variable', function () {
            expect(parse('<div id={{test}}></div>')).to.eql([
                {
                    type: 'Component',
                    attributes: [
                        {
                            name: 'id',
                            value: {
                                type: 'Expression',
                                path: 'test',
                                params: null,
                                hash: null
                            }
                        }
                    ],
                    content: [],
                    name: 'div'
                }
            ]);
        });
        it('tag with attribute variable', function () {
            expect(parse('<div id="{{test}}"></div>')).to.eql([
                {
                    type: 'Component',
                    attributes: [
                        {
                            name: 'id',
                            value: [{
                                type: 'Expression',
                                path: 'test',
                                params: null,
                                hash: null
                            }]
                        }
                    ],
                    content: [],
                    name: 'div'
                }
            ]);
        });
        it('tag with attribute variable', function () {
            expect(parse('<div id=test/>')).to.eql([
                {
                    type: 'Component',
                    attributes: [
                        {
                            name: 'id',
                            value: {
                                type: 'Path',
                                path: 'test'
                            }
                        }
                    ],
                    name: 'div'
                }
            ]);
        });
        it('nesting', function () {
            expect(parse('<div><span>test</span></div>')).to.eql([
                {
                    type: 'Component',
                    attributes: null,
                    content: [{
                        type: 'Component',
                        attributes: null,
                        content: [{
                            type: 'Text',
                            content: 'test'
                        }],
                        name: 'span'
                    }],
                    name: 'div'
                }
            ])
        });
        it('short components', function () {
            expect(parse('<div><br><br></div>')).to.eql([
                {
                    type: 'Component',
                    attributes: null,
                    content: [{
                        type: 'Component',
                        attributes: null,
                        name: 'br'
                    },{
                        type: 'Component',
                        attributes: null,
                        name: 'br'
                    }],
                    name: 'div'
                }
            ])
        });
    });

    describe('comments', function () {
        it('parse html comments', function () {
            expect(parse('<!--<div>-->')).to.eql([
                {
                    type: 'Comment',
                    content: '<div>'
                }
            ])
        });
        it('parse hbs comments', function () {
            expect(parse('{{!<div>}}')).to.eql([
                {
                    type: 'Comment',
                    content: '<div>'
                }
            ])
        });
        it('parse hbs comments', function () {
            expect(parse('{{!--{{val}}--}}')).to.eql([
                {
                    type: 'Comment',
                    content: '{{val}}'
                }
            ])
        });
    });

    describe('Call expressions', function () {
        it('parse empty call', function () {
            expect(parse('<div onclick=onClick()></div>')).to.eql([{
                "attributes": [{
                    "name": "onclick",
                    "value": {
                        "params": [],
                        "path": "onClick",
                        "type": "CallExpression"
                    }
                }],
                "content": [],
                "name": "div",
                "type": "Component"
            }])
        });
    });

    describe('Call expression with param', function () {
        it('parse empty call', function () {
            expect(parse('<div onclick=onClick(test)></div>')).to.eql([{
                "attributes": [{
                    "name": "onclick",
                    "value": {
                        "params": [{
                            "path": "test",
                            "type": "Path"
                        }],
                        "path": "onClick",
                        "type": "CallExpression"
                    }
                }],
                "content": [],
                "name": "div",
                "type": "Component"
            }])
        });
    });
});
