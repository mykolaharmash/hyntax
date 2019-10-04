import { Transform } from 'stream'

declare function tokenize(
  html: string,
  existingState?: Tokenizer.State,
  options?: Tokenizer.Options
): Tokenizer.Result

declare function constructTree(
  tokens: Tokenizer.AnyToken[],
  existingState?: TreeConstructor.State
): TreeConstructor.Result

declare class StreamTokenizer extends Transform {}

declare class StreamTreeConstructor extends Transform {}

export namespace Tokenizer {
  namespace ContextTypes {
    type Data = 'tokenizer-context:data'
    type OpenTagStart = 'tokenizer-context:open-tag-start'
    type CloseTag = 'tokenizer-context:close-tag'
    type Attributes = 'tokenizer-context:attributes'
    type OpenTagEnd = 'tokenizer-context:open-tag-end'
    type AttributeKey = 'tokenizer-context:attribute-key'
    type AttributeValue = 'tokenizer-context:attribute-value'
    type AttributeValueBare = 'tokenizer-context:attribute-value-bare'
    type AttributeValueWrapped = 'tokenizer-context:attribute-value-wrapped'
    type ScriptContent = 'tokenizer-context:script-content'
    type StyleContent = 'tokenizer-context:style-content'
    type DoctypeStart = 'tokenizer-context:doctype-start'
    type DoctypeEnd = 'tokenizer-context:doctype-end'
    type DoctypeAttributes = 'tokenizer-context:doctype-attributes'
    type DoctypeAttributeWrapped = 'tokenizer-context:doctype-attribute-wrapped'
    type DoctypeAttributeBare = 'tokenizer-context:doctype-attribute-bare'
    type CommentStart = 'tokenizer-context:comment-start'
    type CommentContent = 'tokenizer-context:comment-content'
    type CommentEnd = 'tokenizer-context:comment-end'

    type AnyContextType =
      | Data
      | OpenTagStart
      | CloseTag
      | Attributes
      | OpenTagEnd
      | AttributeKey
      | AttributeValue
      | AttributeValueBare
      | AttributeValueWrapped
      | ScriptContent
      | StyleContent
      | DoctypeStart
      | DoctypeEnd
      | DoctypeAttributes
      | DoctypeAttributeWrapped
      | DoctypeAttributeBare
      | CommentStart
      | CommentContent
      | CommentEnd
  }

  namespace TokenTypes {
    type Text = 'token:text'
    type OpenTagStart = 'token:open-tag-start'
    type AttributeKey = 'token:attribute-key'
    type AttributeAssigment = 'token:attribute-assignment'
    type AttributeValueWrapperStart = 'token:attribute-value-wrapper-start'
    type AttributeValue = 'token:attribute-value'
    type AttributeValueWrapperEnd = 'token:attribute-value-wrapper-end'
    type OpenTagEnd = 'token:open-tag-end'
    type CloseTag = 'token:close-tag'
    type OpenTagStartScript = 'token:open-tag-start-script'
    type ScriptTagContent = 'token:script-tag-content'
    type OpenTagEndScript = 'token:open-tag-end-script'
    type CloseTagScript = 'token:close-tag-script'
    type OpenTagStartStyle = 'token:open-tag-start-style'
    type StyleTagContent = 'token:style-tag-content'
    type OpenTagEndStyle = 'token:open-tag-end-style'
    type CloseTagStyle = 'token:close-tag-style'
    type DoctypeStart = 'token:doctype-start'
    type DoctypeEnd = 'token:doctype-end'
    type DoctypeAttributeWrapperStart = 'token:doctype-attribute-wrapper-start'
    type DoctypeAttribute = 'token:doctype-attribute'
    type DoctypeAttributeWrapperEnd = 'token:doctype-attribute-wrapper-end'
    type CommentStart = 'token:comment-start'
    type CommentContent = 'token:comment-content'
    type CommentEnd = 'token:comment-end'

    type AnyTokenType =
      | Text
      | OpenTagStart
      | AttributeKey
      | AttributeAssigment
      | AttributeValueWrapperStart
      | AttributeValue
      | AttributeValueWrapperEnd
      | OpenTagEnd
      | CloseTag
      | OpenTagStartScript
      | ScriptTagContent
      | OpenTagEndScript
      | CloseTagScript
      | OpenTagStartStyle
      | StyleTagContent
      | OpenTagEndStyle
      | CloseTagStyle
      | DoctypeStart
      | DoctypeEnd
      | DoctypeAttributeWrapperStart
      | DoctypeAttribute
      | DoctypeAttributeWrapperEnd
      | CommentStart
      | CommentContent
      | CommentEnd
  }

  interface Options {
    isFinalChunk: boolean
  }

  interface State {
    currentContext: string
    contextParams: ContextParams
    decisionBuffer: string
    accumulatedContent: string
    caretPosition: number
  }

  interface Result {
    state: State
    tokens: AnyToken[]
  }

  type AnyToken = Token<TokenTypes.AnyTokenType>

  interface Token<T extends TokenTypes.AnyTokenType> {
    type: T
    content: string
    startPosition: number
    endPosition: number
  }

  type ContextParams = {
    [C in ContextTypes.AnyContextType]?: {
      wrapper?: '"' | '\'',
      tagName?: string
    }
  }
}

export namespace TreeConstructor {
  namespace NodeTypes {
    type Document = 'document'
    type Doctype = 'doctype'
    type Tag = 'tag'
    type Text = 'text'
    type Comment = 'comment'
    type Script = 'script'
    type Style = 'style'

    type AnyNodeType =
      | Document
      | Doctype
      | Tag
      | Text
      | Comment
      | Script
      | Style
  }

  namespace ContextTypes {
    type TagContent = 'tree-constructor-context:tag-content'
    type Tag = 'tree-constructor-context:tag'
    type TagName = 'tree-constructor-context:tag-name'
    type Attributes = 'tree-constructor-context:attributes'
    type Attribute = 'tree-constructor-context:attribute'
    type AttributeValue = 'tree-constructor-context:attribute-value'
    type Comment = 'tree-constructor-context:comment'
    type Doctype = 'tree-constructor-context:doctype'
    type DoctypeAttributes = 'tree-constructor-context:doctype-attributes'
    type DoctypeAttribute = 'tree-constructor-context:doctype-attribute'
    type ScriptTag = 'tree-constructor-context:script-tag'
    type StyleTag = 'tree-constructor-context:style-tag'

    type AnyContextType =
      | TagContent
      | Tag
      | TagName
      | Attributes
      | Attribute
      | AttributeValue
      | Comment
      | Doctype
      | DoctypeAttributes
      | DoctypeAttribute
      | ScriptTag
      | StyleTag
  }

  namespace NodeContents {
    interface Document {
      children: AnyNode[]
    }

    interface Doctype {
      start: Tokenizer.Token<Tokenizer.TokenTypes.DoctypeStart>
      attributes?: DoctypeAttribute[]
      end: Tokenizer.Token<Tokenizer.TokenTypes.DoctypeEnd>
    }

    interface Text {
      value: Tokenizer.Token<Tokenizer.TokenTypes.Text>
    }

    interface Tag {
      name: string
      selfClosing: boolean
      openStart: Tokenizer.Token<Tokenizer.TokenTypes.OpenTagStart>
      attributes?: TagAttribute[]
      openEnd: Tokenizer.Token<Tokenizer.TokenTypes.OpenTagEnd>
      children?: AnyNode[]
      close: Tokenizer.Token<Tokenizer.TokenTypes.CloseTag>
    }

    interface Comment {
      start: Tokenizer.Token<Tokenizer.TokenTypes.CommentStart>
      value: Tokenizer.Token<Tokenizer.TokenTypes.CommentContent>
      end: Tokenizer.Token<Tokenizer.TokenTypes.CommentEnd>
    }

    interface Script {
      openStart: Tokenizer.Token<Tokenizer.TokenTypes.OpenTagStartScript>
      attributes?: TagAttribute[]
      openEnd: Tokenizer.Token<Tokenizer.TokenTypes.OpenTagEndScript>
      value: Tokenizer.Token<Tokenizer.TokenTypes.ScriptTagContent>
      close: Tokenizer.Token<Tokenizer.TokenTypes.CloseTagScript>
    }

    interface Style {
      openStart: Tokenizer.Token<Tokenizer.TokenTypes.OpenTagStartStyle>,
      attributes?: TagAttribute[],
      openEnd: Tokenizer.Token<Tokenizer.TokenTypes.OpenTagEndStyle>,
      value: Tokenizer.Token<Tokenizer.TokenTypes.StyleTagContent>,
      close: Tokenizer.Token<Tokenizer.TokenTypes.CloseTagStyle>
    }

    type AnyNodeContent =
      | Document
      | Doctype
      | Text
      | Tag
      | Comment
      | Script
      | Style
  }

  interface State {
    caretPosition: number
    currentContext: ContextTypes.AnyContextType
    currentNode: NodeTypes.AnyNodeType
    rootNode: NodeTypes.Document
  }

  interface Result {
    state: State
    ast: AST
  }

  type AST = DocumentNode

  interface Node<T extends NodeTypes.AnyNodeType, C extends NodeContents.AnyNodeContent> {
    nodeType: T
    content: C
  }

  type AnyNode = Node<NodeTypes.AnyNodeType, NodeContents.AnyNodeContent>

  type DocumentNode = Node<NodeTypes.Document, NodeContents.Document>
  type DoctypeNode = Node<NodeTypes.Doctype, NodeContents.Doctype>
  type TextNode = Node<NodeTypes.Text, NodeContents.Text>
  type TagNode = Node<NodeTypes.Tag, NodeContents.Tag>
  type CommentNode = Node<NodeTypes.Comment, NodeContents.Comment>
  type ScriptNode = Node<NodeTypes.Script, NodeContents.Script>
  type StyleNode = Node<NodeTypes.Style, NodeContents.Style>

  interface DoctypeAttribute {
    startWrapper?: Tokenizer.Token<Tokenizer.TokenTypes.DoctypeAttributeWrapperStart>,
    value: Tokenizer.Token<Tokenizer.TokenTypes.DoctypeAttribute>,
    endWrapper?: Tokenizer.Token<Tokenizer.TokenTypes.DoctypeAttributeWrapperEnd>
  }

  interface TagAttribute {
    key?: Tokenizer.Token<Tokenizer.TokenTypes.AttributeKey>,
    startWrapper?: Tokenizer.Token<Tokenizer.TokenTypes.AttributeValueWrapperStart>,
    value?: Tokenizer.Token<Tokenizer.TokenTypes.AttributeValue>,
    endWrapper?: Tokenizer.Token<Tokenizer.TokenTypes.AttributeValueWrapperEnd>
  }
}
